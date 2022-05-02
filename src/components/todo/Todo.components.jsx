import { useState, useEffect } from "react";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import axios from "axios";
import { format } from "date-fns";
import TodoHeader from "./TodoHeader.components";
import TodoPlan from "./TodoPlan.components";
import TodoMy from "./TodoMy.components";
import EditFooter from "./EditFooter.components";
import LoadingScreen from "../globalcomponents/Loading.components";
import ErrorHandle from "../globalcomponents/ErrorHandler.components";

function Todo() {
  const accessToken = sessionStorage.getItem("access");
  const [update, setUpdate] = useState(false);
  const [updateMy, setUpdateMy] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("date")
      ? new Date(sessionStorage.getItem("date"))
      : new Date()
  );
  
  const [current, setCurrent] = useState("PLAN");
  const [planData, setPlanData] = useState();
  const [myTodoData, setMyTodoData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [delay, setDelay] = useState([]);

  const fetchPlan = async () => {
    try {
      await axios
        .get(
          `https://myplanit.link/todos/plan/${format(selectedDate, "yyyy-MM-dd")}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setPlanData(Object.entries(response.data));
          setLoading(false);
        });
    } catch (err) {
      setError(err);
    }
  };

  const fetchMyTodo = async () => {
    try {
      await axios
        .get(
          `https://myplanit.link/todos/my/${format(selectedDate, "yyyy-MM-dd")}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setMyTodoData(response.data.personal_todos);
          setLoading(false);
        });
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (current === "PLAN") {
      fetchPlan();
      setEdit(false);
      setDelay([]);
    }
  }, [current, selectedDate, update]);

  useEffect(() => {
    if (current === "MY") {
      fetchMyTodo();
      setEdit(false);
      setDelay([]);
    }
  }, [current, selectedDate, updateMy]);

  if (error) return <ErrorHandle error={error} />
  if (loading) return <LoadingScreen />;

  return (
    <>
      <TodoHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        edit={edit}
        setEdit={setEdit}
        current={current}
        setCurrent={setCurrent}
        setDelay={setDelay}
        updateMy={updateMy}
        update={update}
      />

      {current === "PLAN" && (
        <TodoPlan
          planData={planData}
          edit={edit}
          update={update}
          setUpdate={setUpdate}
          delay={delay}
          setDelay={setDelay}
          current={current}
        />
      )}

      {current === "MY" && (
        <TodoMy
          myTodoData={myTodoData}
          updateMy={updateMy}
          setUpdateMy={setUpdateMy}
          selectedDate={selectedDate}
          edit={edit}
          delay={delay}
          setDelay={setDelay}
        />
      )}

      {!edit ? (
        <BottomNavBar current="TODO" />
      ) : (
        <EditFooter
          current={current}
          delay={delay}
          update={update}
          setUpdate={setUpdate}
          updateMy={updateMy}
          setUpdateMy={setUpdateMy}
        />
      )}
    </>
  );
}

export default Todo;