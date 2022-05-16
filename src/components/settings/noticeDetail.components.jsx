import { useLocation } from "react-router";
import * as Styled from "./settings.style";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NoticeDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const title = state[0];
  const date = state[1];
  const detail = state[2];
  return (
    <>
      <Styled.Header>
        <Styled.UpperHeader>
          <Styled.BackButton onClick={() => navigate(-1)} />
          <Styled.Title>{title}</Styled.Title>
        </Styled.UpperHeader>
      </Styled.Header>
      <Container>
        <NoticeDate>{date}</NoticeDate>
        <NoticeContent>{detail}</NoticeContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  overflow-x: 
  position: relative;
  width: 330px;
  display: flex;
  flex-direction: column;
  margin-top: 70px;

`;

const NoticeDate = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #929292;
`;

const NoticeContent = styled.pre`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  white-space: pre-wrap;
`;
