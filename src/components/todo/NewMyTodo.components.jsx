import { useState, useRef } from "react";
import axios from "axios";
import { Input } from "antd";
import Sheet from "react-modal-sheet";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

function NewMyTodo({ selectedDate, updateMy, setUpdateMy }) {
  const [isOpen, setOpen] = useState(false);
  const [todo, setTodo] = useState([]);
  const accessToken = sessionStorage.getItem("access");
  const inputRef = useRef(null);

  const addNewTodo = () => {
    if (todo !== "") {
      axios
        .post(
          `https://myplanit.link/todos/my/${selectedDate.getFullYear()}-${(
            "0" +
            (selectedDate.getMonth() + 1)
          ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`,
          {
            todo_name: todo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((e) => {
          setUpdateMy(!updateMy);
          e.target.blur();
          setOpen(false);
          setTodo("");
        });
    }
  };

  return (
    <>
      <OpenAddModal
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current.focus(), 200);
        }}
        size="large"
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />

      <StyledSheet
        isOpen={isOpen}
        onClose={(e) => {
          e.target.blur();
          setOpen(false);
        }}
        snapPoints={[250]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <NewTodoInput
              size="large"
              placeholder="오늘 할 일을 입력해주세요.."
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              value={todo}
              ref={inputRef}
            />
            <AddButton onClick={addNewTodo}>추가하기</AddButton>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop
          onTap={(e) => {
            setOpen(false);
            e.target.blur();
          }}
        />
      </StyledSheet>
    </>
  );
}

export default NewMyTodo;

const OpenAddModal = styled(Button)`
  background-color: #8977f7;
  position: fixed;
  bottom: 110px;
  transform: translate(150px);
  border-color: #7965f4 !important;
  box-shadow: none !important;
  z-index: 10;

  &: hover {
    background-color: #8977f7;
  }

  &: focus {
    background-color: #8977f7;
  }
`;

const AddButton = styled.button`
  width: 327px;
  height: 52px;
  border: 0;
  background: #7965f4;
  border-radius: 4px;
  color: white;
  font-family: PretendardMedium;
  font-size: 18px;
  margin: 25px auto;
  display: block;
`;

const NewTodoInput = styled(Input)`
display: block;
margin-left: auto;
margin-right: auto;
width: 327px;
font-family: "PretendardRegular"
font-size: 16px;
color: black;
`;

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    border: none;
  }
`;
