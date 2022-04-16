import { useState } from "react";
import styled from "styled-components";
import PlanCard from "./PlanCard.components";
import PlanSheet from "./PlanSheet.components";

function MyPlanContent({ plans, register, buy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState({});
  const [date, setDate] = useState({});
  const [registered, setRegistered] = useState();
  return (
    <Container>
      {plans.map((item, i) => (
        <PlanCard
          key={i}
          title={item.plan.name}
          profile_img={item.plan.writer_img}
          plan_img={item.plan.intro_img_url}
          writer_name={item.plan.writer_name}
          writer_intro={item.plan.writer_intro}
          desc={item.plan.desc}
          tags={item.plan.tags}
          onClick={() => {
            setPlan({ ...item.plan });
            setDate([item.start_date, item.finish_date]);
            setIsOpen(true);
            setRegistered(item.register_flag);
          }}
        />
      ))}

      {register && (
        <PlanSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          planId={plan.id}
          title={plan.name}
          writer_name={plan.writer_name}
          date={date}
          register
        />
      )}

      {buy && (
        <PlanSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          planId={plan.id}
          title={plan.name}
          writer_name={plan.writer_name}
          is_registered={registered}
          buy
        />
      )}
    </Container>
  );
}

export default MyPlanContent;

const Container = styled.div`
  overflow-y: scroll;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 90px;
`;
