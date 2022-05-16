import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Sheet from "react-modal-sheet";

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
`;

export const Title = styled.div`
  font-family: "SFProDisplay";
  font-weight: 510;
  font-size: 18px;
  height: 56px;
  line-height: 56px;
`;

export const Row = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 25px;
  display: flex;
  width: 327px;
`;

export const RowSide = styled.span`
  margin-left: auto;
`;
export const RowSideIcon = styled.img`
  height: 20px;
  margin-left: auto;
  margin-right: 0;
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
  background-color: #7965f4;
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
