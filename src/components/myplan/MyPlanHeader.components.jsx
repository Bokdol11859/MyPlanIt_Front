import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./MyPlanHeader.style";
import Sheet from "react-modal-sheet";

function MyPlanHeader({ current, setCurrent, buyLength, registerLength }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("refresh");
    sessionStorage.removeItem("access");
    navigate("/");
  };

  return (
    <>
      <Styled.Header>
        <Styled.UpperHeader>
          <Styled.BackButton onClick={() => navigate(-1)} />
          <Styled.Title>MY PLAN</Styled.Title>
          <Styled.LogoutBtn onClick={() => setOpen(true)}>
            로그아웃
          </Styled.LogoutBtn>
        </Styled.UpperHeader>

        <Styled.LowerHeader>
          <Styled.LinkButton
            selected={current === "BUY"}
            onClick={() => setCurrent("BUY")}
          >
            {`구매 플랜(${buyLength})`}
          </Styled.LinkButton>
          <Styled.LinkButton
            selected={current === "REGISTER"}
            onClick={() => setCurrent("REGISTER")}
          >
            {`이용 중(${registerLength})`}
          </Styled.LinkButton>
        </Styled.LowerHeader>
      </Styled.Header>

      <Styled.StyledSheet isOpen={open} snapPoints={[200]}>
        <Sheet.Container>
          <Sheet.Header />

          <Sheet.Content>
            <Styled.Text>로그아웃 할까요?</Styled.Text>
            <Styled.Button onClick={logout}>네</Styled.Button>
            <Styled.Button cancel onClick={() => setOpen(false)}>
              아니오
            </Styled.Button>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Styled.StyledSheet>
    </>
  );
}

export default MyPlanHeader;
