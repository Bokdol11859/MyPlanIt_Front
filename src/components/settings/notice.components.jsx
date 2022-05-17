import styled from "styled-components";
import * as Styled from "./settings.style";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../globalcomponents/Loading.components";
import NoticeDetail from "./noticeDetail.components";

export default function Notice() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState("MyPlanIt");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    document.title = title;
    const fetchNotices = async () => {
      try {
        setTitle("Notice");
        await axios
          .get("https://myplanit.link/notice", {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res.data.Notice);
            setNotices([...res.data.Notice]);
            console.log(notices);
          });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchNotices();
  }, [update, title]);

  if (error) return error;

  if (loading)
    return (
      <div>
        <LoadingScreen />
        <BottomNavBar current="TODO" />
      </div>
    );
  return (
    <>
      <Styled.Header>
        <Styled.UpperHeader>
          <Styled.BackButton onClick={() => navigate(-1)} />
          <Styled.Title>공지사항</Styled.Title>
        </Styled.UpperHeader>
      </Styled.Header>
      <Container>
        {notices &&
          notices.map((notice, i) => (
            <div
              key={i}
              onClick={() => {
                navigate("/noticeDetail", {
                  state: [notice.title, notice.created_at, notice.content],
                });
              }}
            >
              <NoticeDate>{notice.created_at}</NoticeDate>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <hr style={{ border: "0.1px solid grey" }} />
            </div>
          ))}
      </Container>
      <BottomNavBar current="TODO" />
    </>
  );
}

const NoticeDate = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #929292;
`;
const NoticeTitle = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 14px;
`;
const Container = styled.div`
  overflow-y: scroll;
  position: relative;
  width: 370px;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
`;
