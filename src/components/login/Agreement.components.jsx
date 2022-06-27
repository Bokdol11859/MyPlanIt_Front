import React from "react";
import { Checkbox } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import constants from "../../constants";
import Button from "@mui/material/Button";

function Agreement() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <UpperHeader>
          <BackButton onClick={() => navigate(-1)} />
          <Title>약관 동의</Title>
        </UpperHeader>
      </Header>
      <br />
      <br />
      <br />
      <br />
      <Container>
        <StyledCheckbox
        // disabled={isChecked && edit}
        // checked={isChecked}
        />
        <span
          style={{
            display: "flex",
            width: "80vw",
            margin: "0px 8px",
            fontSize: 14,
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "PretendardMedium" }}>
            서비스 이용약관 동의 (필수)
          </span>
          <DetailIcon src={constants.DETAIL_ICON} />
        </span>
      </Container>
      <Container>
        <StyledCheckbox
        // disabled={isChecked && edit}
        // checked={isChecked}
        />
        <span
          style={{
            display: "flex",
            width: "80vw",
            margin: "0px 8px",
            fontSize: 14,
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "PretendardMedium" }}>
            개인정보 처리방침 동의 (필수)
          </span>
          <DetailIcon src={constants.DETAIL_ICON} />
        </span>
      </Container>
      <div>
        <Button style={{ marginTop: "50vh" }}>
          <div
            className="select-button"
            style={{
              fontFamily: "PretendardRegular",
              fontSize: "14px",
              textAlign: "center",
              width: "80vw",
              verticalAlign: "bottom",
            }}
          >
            다음
          </div>
        </Button>
      </div>
    </>
  );
}

const Container = styled.div`
  padding: 25px 0;
  height: 36px;
  margin-top: 15px;
  margin-left: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1.5px solid #ededed;
  border-radius: 4px;
  width: 80vw;
  height: 40px;
`;

const DetailIcon = styled.img`
  height: 16px;
  margin-left: auto;
`;

const Header = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpperHeader = styled.div`
  background: #fbfbfb;
  width: 327px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const BackButton = styled(ArrowBackIosIcon)`
  height: 56px;
  position: absolute;
  left: 0;
  color: black;
`;

const Title = styled.div`
  font-family: "SFProDisplay";
  font-weight: 510;
  font-size: 18px;
  height: 56px;
  line-height: 56px;
`;

const StyledCheckbox = styled(Checkbox)`
  align-items: center;
  margin-left: 15px;
  .ant-checkbox {
    top: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => (props.checked ? "#8977f7" : "#FFFFFF")};
    border-color: #8977f7;
  }

  .ant-checkbox-checked::after {
    border-color: #8977f7;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #8977f7;
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    background-color: #e1dcfe;
    border-color: #e1dcfe !important;
  }

  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #ffffff;
  }
`;

export default Agreement;
