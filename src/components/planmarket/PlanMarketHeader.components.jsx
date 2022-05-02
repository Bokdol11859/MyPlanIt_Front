import {useNavigate} from "react-router-dom"
import styled from "styled-components";

function PlanMarketHeader() {
  const navigate = useNavigate();

  return (
    <Header>
      <Title>플랜</Title>
      <ProposalButton
        onClick={() => navigate("../proposal")}
      >
        <Text>신청하기</Text>
        <img src="/images/arrow_icon.svg" />
      </ProposalButton>
    </Header>
  );
}

export default PlanMarketHeader;

const Header = styled.div`
  background: #fbfbfb;
  width: 327px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  margin: 10px;
`;

const ProposalButton = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
`;

const Title = styled.div`
  font-family: "PretendardMedium";
  font-size: 18px;
  height: 30px;
  line-height: 30px;
`;

const Text = styled.div`
  color: #8977f7;
  font-size: 14px;
  font-family: "PretendardMedium";
  margin-right: 5px;
`