import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sheet from "react-modal-sheet";
import axios from "axios";
import styled from "styled-components";
import MyPlanModal from "./MyPlanModal.components";

function PlanSheet({
  isOpen,
  setIsOpen,
  title,
  writer_name,
  planId,
  register,
  buy,
  date,
  update,
  setUpdate,
}) {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("register");

  const registerPlan = () => {
    axios
      .post(
        `https://myplanit.link/myplans/${planId}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 202) {
          setModalType("register");
          setModalOpen(true);
          setIsOpen(false);
        } else {
          navigate("/todo");
        }
      });
  };

  const deletePlan = () => {
    axios
      .post(
        `https://myplanit.link/myplans/${planId}/delete`,
        {
          plan_id: planId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setUpdate(!update);
        setModalOpen(false);
        setIsOpen(false);
      });
  };
  
  return (
    <>
      <StyledSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={[300]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Title>{title}</Title>
            <Author>
              {register && (
                <Text color="black">
                  {date[0]} ~ {date[1]}
                </Text>
              )}
              <Text color="#929292">{writer_name}</Text>
            </Author>

            {buy && (
              <StyledButton onClick={registerPlan} underline>
                <Text>투두 등록하기</Text>
              </StyledButton>
            )}

            <StyledButton
              onClick={() => {
                navigate("../todo/plan/" + planId, {
                  state: { title: title },
                });
              }}
              underline
            >
              <Text>투두 모아보기</Text>
            </StyledButton>

            <StyledButton
              onClick={() => navigate("/planmarket/plan/" + planId)}
              underline={register}
            >
              <Text>플랜 마켓 가기</Text>
            </StyledButton>

            {register && (
              <StyledButton onClick={() => {
                setModalType("delete");
                setModalOpen(true);
                setIsOpen(false);
              }}>
                <Text color="red">투두 리스트에서 제거하기</Text>
              </StyledButton>
            )}
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop
          onTap={() => {
            setIsOpen(false);
          }}
        />
      </StyledSheet>

      <MyPlanModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type={modalType}
        deletePlan={deletePlan}
      />
    </>
  );
}

export default PlanSheet;

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    border: none;
  }

  .react-modal-sheet-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.div`
  font-family: "PretendardMedium";
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  width: 327px;
  margin: 2px 0;
`;

const Text = styled.div`
  font-family: "PretendardRegular";
  font-size: 14px;

  color: ${(props) => props.color || "#000000"};
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  width: 327px;
  height: 64px;
  padding: 0px;
  text-align: start;
  display: flex;
  align-items: center;

  border-bottom: ${(props) =>
    props.underline ? "0.7px solid #E9E9E9" : "none"};
`;

const Author = styled.span`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 327px;
`;
