import { useState } from "react";
import styled from "styled-components";
import * as Styled from "./settings.style";
import { useNavigate } from "react-router-dom";
import Sheet from "react-modal-sheet";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import axios from "axios";
export default function Unregister() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const accessToken = sessionStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const Unregister = async () => {
    await axios
      .delete("https://myplanit.link/unregister", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Styled.Header>
        <Styled.UpperHeader>
          <Styled.BackButton onClick={() => navigate(-1)} />
          <Styled.Title>탈퇴하기</Styled.Title>
        </Styled.UpperHeader>
      </Styled.Header>

      <div style={{ marginTop: 150 }}>
        <img src="images/Unregister.svg" style={{ marginRight: 35 }} />
      </div>

      <BuyButton onClick={() => setOpen(true)}>탈퇴하기</BuyButton>

      <Styled.StyledSheet isOpen={open} snapPoints={[250]}>
        <Sheet.Container>
          <Sheet.Header />

          <Sheet.Content>
            <Styled.Text>탈퇴할까요?</Styled.Text>
            <Styled.Button
              onClick={() => {
                Unregister();
              }}
            >
              네
            </Styled.Button>
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
  margin-top: 130px;
`;
