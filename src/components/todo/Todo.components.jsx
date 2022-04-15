import { useState, useEffect } from "react";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import axios from "axios";
import { format } from "date-fns";
import TodoHeader from "./TodoHeader.components";
import TodoPlan from "./TodoPlan.components";
import TodoMy from "./TodoMy.components";
import EditFooter from "./EditFooter.components";
import LoadingScreen from "../globalcomponents/Loading.components";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [delay, setDelay] = useState([]);

  const fetchPlan = async () => {
    try {
      await axios
        .get(
          `https://myplanit.link/todos/plan/${format(selectedDate, "yyyy-MM-dd")}`,
          {
            Authorization: `Bearer ${accessToken}`,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setPlanData(Object.entries(response.data));
        });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const fetchMyTodo = async () => {
    try {
      await axios
        .get(
          `https://myplanit.link/todos/my/${format(selectedDate, "yyyy-MM-dd")}`,
          {
            Authorization: `Bearer ${accessToken}`,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setMyTodoData(response.data.personal_todos);
        });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlan();
    setEdit(false);
    setDelay([]);
  }, [selectedDate, update]);

  useEffect(() => {
    fetchMyTodo();
    setEdit(false);
    setDelay([]);
  }, [selectedDate, updateMy]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>에러가 발생했습니다</div>;

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