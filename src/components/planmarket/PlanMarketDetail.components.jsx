import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PlanMarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);
  const [open, setOpen] = useState(false);
  const fetchPlan = async () => {
    try {
      const response = await axios.get("https://myplanit.link/plans/" + id);
      setPlan(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const accessToken = sessionStorage.getItem("access");
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    axios
      .all([
        axios.post(
          "https://myplanit.link/plans/" + id + "/buy",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        axios.post(
          "https://myplanit.link/myplans/" + id + "/register",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
      ])
      .then((response) => {
        navigate("/todo");
      });
    setOpen(false);
  };

  return (
    <>
      <MainImage src={plan.intro_img_url} />
      <PlanInfo>
        <Title>{plan.name}</Title>
        <Info>
          {plan.tags?.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
          <Dot />
          <Text color="#929292" size="12px">
            기간 4주
          </Text>
          <Dot />
          <Text color="#929292" size="12px">
            무료
          </Text>
        </Info>
      </PlanInfo>

      <ProfileContainer>
        <ProfileImg src={plan.writer_img} alt="profile_img" />
        <Profile>
          <ProfileText isName>{plan.writer_name}</ProfileText>
          <ProfileText>{plan.writer_intro}</ProfileText>
        </Profile>
      </ProfileContainer>

      <PlanIntro>
        <Text size="16px" font="PretendardMideum" margin="20px">
          플랜 소개
        </Text>
      </PlanIntro>
    </>
  );
}

export default PlanMarketDetail;

const MainImg = styled.img`
  width: 100%;
`;

const Dot = styled.div`
  border-radius: 100%;
  background-color: #929292;
  width: 2px;
  height: 2px;
  margin: 0 8px;
`;

const Text = styled.div`
  color: ${(props) => props.color || "#000000"};
  font-family: ${(props) => props.font || "PretendardRegular"};
  font-size: ${(props) => props.size};
  margin-bottom: ${(props) => props.margin};
`;


const MainImage = styled.img`
  width: 375px;
  hegiht: 198px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: "PretendardSemiBold";
  font-size: 22px;
  margin-bottom: 12px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const Tag = styled.div`
  width: 45px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 10px;
  color: #7965f4;
  border-radius: 4px;
  margin-right: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
  font-family: "PretendardRegular";
`;

const ProfileContainer = styled.div`
  width: 327px;
  height: 89px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 96px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 2px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  color: black;
  justify-content: center;
`;

const ProfileText = styled.div`
  font-size: 16px;
  font-family: ${(props) =>
    props.isName ? "PretendardSemiBold" : "PretendardRegular"};
  font-weight: 400;
`;

const PlanIntro = styled.div`
  display: flex;
  flex-direction: column;
  width: 327px;
`;
