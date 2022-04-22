import Calendar from "./Calendar.components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";
import WeekCalendar from "./WeekCalendar.components";
import { useEffect, useState } from "react";
import axios from "axios";

function TodoHeader({
  selectedDate,
  setSelectedDate,
  edit,
  setEdit,
  current,
  setCurrent,
  setDelay,
  updateMy,
  update,
}) {
  const accessToken = sessionStorage.getItem("access");
  const linkText = ["PLAN", "MY"];
  const [days, setDays] = useState([]);

  const fetchDays = () => {
    axios
      .get("https://myplanit.link/todos/allofdate", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const planDays = res.data.plan_todos.map((item) => item.date);
        const myPlanDays = res.data.personal_todos.map((item) => item.date);
        const dayList = [...new Set([...planDays, ...myPlanDays])];
        setDays(dayList);
      });
  };

  useEffect(() => {
    fetchDays();
  }, [update, updateMy]);

  return (
    <HeaderContainer>
      <UpperHeader>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          days={days}
        />
        <Link to="../myplan">
          <StyledButton>MY PLAN</StyledButton>
        </Link>
      </UpperHeader>

      <WeekCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        days={days}
      />

      <LowerHeader>
        {linkText.map((item, i) => (
          <LinkButton
            key={i}
            selected={current === item}
            onClick={() => setCurrent(item)}
          >
            {item}
          </LinkButton>
        ))}
        <EditButton
          editing={edit}
          onClick={() => {
            setEdit(!edit);
            setDelay([]);
          }}
        >
          {edit && (
            <img
              src="/images/purpletick.png"
              style={{ width: "12px", marginRight: 4 }}
            />
          )}
          {edit ? "편집완료" : "편집하기"}
        </EditButton>
      </LowerHeader>
    </HeaderContainer>
  );
}

export default TodoHeader;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: #fbfbfb;
`;

const UpperHeader = styled.div`
  display: flex;
  width: 327px;
  justify-content: space-between;
  align-items: center;
`;

const LowerHeader = styled.div`
  display: flex;
  width: 327px;
  position: relative;
`;

const LinkButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  margin-top: 0px;
  background-color: #fbfbfb;
  border-radius: 0;
  border-width: 0px 0px 0px;
  font-family: "SFProDisplay";
  font-size: 16px;
  margin-right: 15px;
  padding: 0 0 1px;

  color: ${(props) => (props.selected ? "black" : "#C4C4C4")};
  border-bottom: ${(props) => (props.selected ? "2px solid #8977f7" : "none")};
  padding-bottom: ${(props) => (props.selected ? "4px" : "6px")};
`;

const EditButton = styled.p`
  position: absolute;
  right: 0;
  margin-top: 0;
  font-family: "PretendardMedium";
  font-size: 12px;
  color: ${(props) => (props.editing ? "#8977F7" : "#929292")};
`;

const StyledButton = styled(Button)`
  margin-left: 20px;
  height: 25px;
  width: 73px;
  font-size: 9px;
  margin-top: 10px;
  font-family: "SFProDisplay";
`;
