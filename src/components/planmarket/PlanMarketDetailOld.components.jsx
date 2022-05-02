import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import LoadingScreen from "../globalcomponents/Loading.components";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PlanMarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const accessToken = sessionStorage.getItem("access");
  const fetchPlan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://myplanit.link/plans/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPlan(response.data.Plan);
      setIsRegistered(response.data.own_flag);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buyPlan = () => {
    axios
      .all([
        axios.post(
          `https://myplanit.link/plans/${id}/buy`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        axios.post(
          `https://myplanit.link/myplans/${id}/register`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
      ])
      .then(() => {
        navigate("/todo");
      });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <>
      <MainImg src={plan.main_img_url} />

      <StyledArrowButton onClick={() => navigate(-1)} />

      <Footer>
        {isRegistered ? (
          <BuyButton disabled>구매한 플랜입니다</BuyButton>
        ) : (
          <BuyButton onClick={handleClickOpen}>지금 바로 구매하기</BuyButton>
        )}
      </Footer>

      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogImg src="/images/celebrate.png" />

        <DialogTitle id="alert-dialog-title">
          {"짠! 지금은 무료체험 기간이에요."}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            선택하신 플랜을 무료로 사용해보세요!
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ display: "flex", flexDirection: "column" }}>
          <DialogButton width="240px" height="52px" onClick={buyPlan}>
            내 투두에 추가하기
          </DialogButton>
          <CancelButton onClick={() => setOpen(false)}>취소하기</CancelButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default PlanMarketDetail;

const MainImg = styled.img`
  width: 100%;
`;

const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  filter: drop-shadow(0px -3px 4px rgba(0, 0, 0, 0.04));
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 85px;
`;

const StyledArrowButton = styled(ArrowBackIosIcon)`
  color: #7965f4;
  position: fixed;
  top: 30px;
  left: 24px;
`;

const BuyButton = styled.button`
  width: 327px;
  height: 52px;
  padding: 18px;
  line-height: 14px;
  background: #7965f4;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-family: "PretendardMedium";
  margin-bottom: 10px;

  ${(props) =>
    props.disabled &&
    `
    background: #c4c4c4;
    touch-action: none;
  `}
`;

const StyledDialog = styled(Dialog)`
  #alert-dialog-title {
    font-size: 16px;
    font-family: "PretendardMedium";
    padding: 12px;
    width: 260px;
    text-align: center;
  }

  #alert-dialog-description {
    font-size: 12px;
    font-family: "PretendardMedium";
    text-align: center;
    color: #929292;
  }
`;

const DialogButton = styled.button`
  width: 220px;
  height: 42px;
  line-height: 14px;
  background: #7965f4;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-family: "PretendardMedium";
  margin: 0 0 10px;
`;

const DialogImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 40px auto 10px;
`;

const CancelButton = styled.button`
  background: #c4c4c4;
  width: 220px;
  height: 42px;
  line-height: 14px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-family: "PretendardMedium";
  margin: 0 0 10px;
  margin-left: 0px !important;
`;
