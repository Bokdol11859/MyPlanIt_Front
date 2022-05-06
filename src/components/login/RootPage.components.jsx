import { useEffect } from "react";
import * as Styled from "./LoginPage.style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import constants from "../../constants";

function RootPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      axios
        .post("https://myplanit.link/api/token/refresh", {
          refresh,
        })
        .then((res) => {
          if (res.status === 200) {
            const access = res.data.access;
            sessionStorage.setItem("access", access);
            navigate("/todo");
          } else if (res.status === 401) {
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("access");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("access");
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Styled.Container>
      <Styled.LogoImg src={constants.LOGO} alt="logo" />
      <Styled.LogoText>당신의 목표 가이드, 마이플랜잇</Styled.LogoText>
    </Styled.Container>
  );
}

export default RootPage;
