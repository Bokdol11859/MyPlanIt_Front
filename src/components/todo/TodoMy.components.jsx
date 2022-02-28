import { useState } from "react";
import MyTodo from "./MyTodo.components";
import constants from "../../constants";
import NewMyTodo from "./NewMyTodo.components";
import styled from 'styled-components';

function TodoMy({
  myTodoData,
  accessToken,
  updateMy,
  setUpdateMy,
  selectedDate,
  edit,
  delay,
  setDelay
}) {
  const todoExist = myTodoData?.length;
  const noTodoImg = (
    <img
      src={constants.NO_TODO_IMG}
      style={{ width: "80%", marginTop: "140px" }}
    />
  );

  return (
    <Container>
      {todoExist
        ? myTodoData.map((todo, i) => (
            <MyTodo
              accessToken={accessToken}
              updateMy={updateMy}
              setUpdateMy={setUpdateMy}
              key={i}
              todo={todo}
              edit={edit}
              delay={delay}
              setDelay={setDelay}
            />
          ))
        : noTodoImg}

      <NewMyTodo
        selectedDate={selectedDate}
        accessToken={accessToken}
        updateMy={updateMy}
        setUpdateMy={setUpdateMy}
      />
    </Container>
  );
}

export default TodoMy;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  margin-bottom: 95px;
  width: 327px;
  overflow-Y: scroll;
  font-family: "PretendardSemiBold";
`