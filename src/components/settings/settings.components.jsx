import styled from "styled-components";
import { useState } from "react";
import * as Styled from "./settings.style";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
import Sheet from "react-modal-sheet";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";

export default function Settings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("refresh");
    sessionStorage.removeItem("access");
    navigate("/login");
  };
  return (
    <>
      <Styled.Header>
        <Styled.UpperHeader>
          <Styled.BackButton onClick={() => navigate(-1)} />
          <Styled.Title>설정</Styled.Title>
        </Styled.UpperHeader>
      </Styled.Header>
      <Container>
        <Styled.Row>
          앱 버전 <Styled.RowSide>1.0.3</Styled.RowSide>
        </Styled.Row>
        <Styled.Row>
          공지사항 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
        </Styled.Row>
        <SendMail href="mailto:myplanit.unicorn@gmail.com">
          <Styled.Row>
            문의하기 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
          </Styled.Row>
        </SendMail>
        <Styled.Row onClick={() => navigate("/Tos")}>
          이용약관 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
        </Styled.Row>
        <Styled.Row onClick={() => navigate("/Privacy")}>
          개인정보 처리방침 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
        </Styled.Row>
        <Styled.Row onClick={() => setOpen(true)}>
          로그아웃 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
        </Styled.Row>
        <Styled.Row>
          탈퇴하기 <Styled.RowSideIcon src={constants.DETAIL_ICON} />
        </Styled.Row>
      </Container>

      <Styled.StyledSheet isOpen={open} snapPoints={[250]}>
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

      <BottomNavBar current="TODO" />
    </>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  position: relative;
  width: 327px;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 90px;
`;

const SendMail = styled.a`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;
