import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "styled-components";
import axios from "axios";
import BottomNavBar from "../../globalcomponents/BottomNavBar.components";
import LoadingScreen from "../../globalcomponents/Loading.components";

function TodoDetail() {
  const accessToken = sessionStorage.getItem("access");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setImgUrl(null);
        setLoading(true);
        await axios
          .get(`https://myplanit.link/todos/plan/${id}/detail`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setImgUrl(response.data.image_url);
            setTitle(response.data.plan_todo_name);
          });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!imgUrl) return null;
  if (loading) return <LoadingScreen />;
  return (
    <>
      <Header>
        <FlexBox>
          <ArrowBackIosIcon
            style={{
              height: 56,
              color: "black",
              position: "absolute",
              left: 0,
            }}
            onClick={() => navigate(-1)}
          />
          <Title>{title}</Title>
        </FlexBox>
      </Header>

      <Content>
        <MainImg src={imgUrl} />
      </Content>

      <BottomNavBar current="TODO" />
    </>
  );
}

export default TodoDetail;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 327px;
`;

const Header = styled.div`
  background: #ffffff;
  width: 100vw;
  display: flex;
  position: fixed;
  justify-content: center;
  height: 56px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Title = styled.div`
  font-family: "PretendardMedium";
  font-weight: 510;
  font-size: 18px;
  height: 56px;
  line-height: 56px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 56px;
  padding-top: 26px;
  overflow-y: scroll;
`;

const MainImg = styled.img`
  width: 327px;
  margin-bottom: 120px;
`;
