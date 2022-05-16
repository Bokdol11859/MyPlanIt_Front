import styled from "styled-components";
import * as Styled from "./settings.style";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../globalcomponents/Loading.components";

export default function Notice() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState("MyPlanIt");

  useEffect(() => {
    document.title = title;
    const fetchRegisterPlans = async () => {
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
            console.log(res);
          });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchRegisterPlans();
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

      <BottomNavBar current="TODO" />
    </>
  );
}
