import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ErrorHandler({ error }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.response.status === 401) {
      axios
        .post("https://myplanit.link/api/token/refresh", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((res) => {
          const access = res.data.access;
          sessionStorage.setItem("access", access);
          navigate(-1);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("refresh");
            navigate('/login');
          }
        })
    }
  });

  return <div>{error.massage}</div>;
}

export default ErrorHandler;
