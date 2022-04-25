import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";

function MyPlanModal({ modalOpen, setModalOpen, type, deletePlan }) {
  return (
    <>
      <StyledDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {type === "register" && "이미 등록된 플랜입니다"}
          {type === "delete" && "정말 제거하시겠습니까?"}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          {type === "register" && (
            <DialogButton onClick={() => setModalOpen(false)}>
              확인
            </DialogButton>
          )}
          {type === "delete" && (
            <>
              <DialogButton onClick={() => deletePlan()}>확인</DialogButton>
              <CancelButton onClick={() => setModalOpen(false)}>
                취소
              </CancelButton>
            </>
          )}
        </DialogContent>
      </StyledDialog>
    </>
  );
}

export default MyPlanModal;

const StyledDialog = styled(Dialog)`
  #alert-dialog-title {
    font-size: 16px;
    font-family: "PretendardMedium";
    padding: 24px;
    width: 260px;
    text-align: center;
  }

  #alert-dialog-description {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-family: "PretendardMedium";
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
`;

const CancelButton = styled(DialogButton)`
  background: #c4c4c4;
  margin-top: 8px;
`;
