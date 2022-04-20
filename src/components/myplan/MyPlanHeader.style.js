import styled from "styled-components";
import Sheet from "react-modal-sheet";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const Header = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UpperHeader = styled.div`
  background: #fbfbfb;
  width: 327px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 56px;
`;

export const BackButton = styled(ArrowBackIosIcon)`
    height: 56px;
    position: absolute;
    left: 0;
    color: black;
`

export const LowerHeader = styled.div`
  display: flex;
  width: 327px;
  margin: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10;
`;

export const Title = styled.div`
  font-family: "SFProDisplay";
  font-weight: 510;
  font-size: 18px;
  height: 56px;
  line-height: 56px;
`;

export const LinkButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  background-color: #fbfbfb;
  border-radius: 0;
  border-width: 0px 0px 0px;
  font-family: "PretendardMedium";
  font-size: 16px;
  margin-right: 15px;
  padding: 0 0 1px;

  color: ${(props) => (props.selected ? "black" : "#C4C4C4")};
  border-bottom: ${(props) => (props.selected ? "2px solid #8977f7" : "none")};
  padding-bottom: ${(props) => (props.selected ? "2px" : "4px")};
`;

export const LogoutBtn = styled.button`
  position: absolute;
  right: 0px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 4px;
  width: 64px;
  height: 24px;
  font-size: 10px;
  font-family: "PretendardMedium";
`;

export const StyledSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    border: none;
  }

  .react-modal-sheet-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  font-family: "PretendardMedium";
  margin-bottom: 24px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #7965F4;
  color: #ffffff;
  width: 327px;
  height: 48px;
  margin-bottom: 12px;

  ${(props) =>
    props.cancel &&
    `
    background-color: #f4f4f4;
    color: #000000;
  `}
`;
