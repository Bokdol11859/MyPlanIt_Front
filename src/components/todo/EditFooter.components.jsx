import axios from "axios";
import constants from "../../constants";
import * as Styled from "./EditFooter.style";

function EditFooter({
  current,
  delay,
  update,
  setUpdate,
  updateMy,
  setUpdateMy,
}) {
  const accessToken = sessionStorage.getItem("access");
  const delayTodo = () => {
    for (let i = 0; i < delay.length; i++) {
      axios
        .post(
          `https://myplanit.link/todos/plan/delay/${delay[i]}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          setUpdate(!update);
        });
    }
  };

  const delayMyTodo = () => {
    for (let i = 0; i < delay.length; i++) {
      axios
        .post(
          `https://myplanit.link/todos/my/${delay[i]}/delay`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          setUpdateMy(!updateMy);
        });
    }
  };

  const advanceTodo = () => {
    for (let i = 0; i < delay.length; i++) {
      axios
        .post(
          `https://myplanit.link/todos/plan/advance/${delay[i]}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          setUpdate(!update);
        });
    }
  };

  const advanceMyTodo = () => {
    for (let i = 0; i < delay.length; i++) {
      axios
        .post(
          `https://myplanit.link/todos/my/${delay[i]}/advance`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          setUpdateMy(!updateMy);
        });
    }
  };

  const deleteTodo = () => {
    for (let i = 0; i < delay.length; i++) {
      axios
        .delete(`https://myplanit.link/todos/my/${delay[i]}/delete`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          setUpdateMy(!updateMy);
        });
    }
  };

  return (
    <Styled.Footer>
      <Styled.Button onClick={current == "MY" ? advanceMyTodo : advanceTodo}>
        <img src={constants.ADVANCE} height="19" />
        <Styled.NavText>하루 당기기</Styled.NavText>
      </Styled.Button>
      <Styled.Button onClick={current == "MY" ? delayMyTodo : delayTodo}>
        <img src={constants.DO_TOMORROW} height="19" />
        <Styled.NavText>하루 미루기</Styled.NavText>
      </Styled.Button>
      {current === "MY" && (
        <Styled.Button onClick={deleteTodo}>
          <img src={constants.DELETE} height="19" />
          <Styled.NavText>삭제하기</Styled.NavText>
        </Styled.Button>
      )}
    </Styled.Footer>
  );
}

export default EditFooter;
