import { useState, useEffect } from "react";
import axios from "axios";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import PlanMarketHeader from "./PlanMarketHeader.components";
import PlanMarketContent from "./PlanMarketContent.components";
import LoadingScreen from "../globalcomponents/Loading.components";

function PlanMarket() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("MyPlanIt");

  useEffect(() => {
    document.title = title;
    const fetchPlans = async () => {
      try {
        setTitle("Plan Market");
        setLoading(true);
        const response = await axios.get("https://myplanit.link/plans");
        const data = response.data;
        setPlans([...data.Routine, ...data.Growth]);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPlans();
  }, [title]);

  if (loading)
    return (
      <div>
        <LoadingScreen />
        <BottomNavBar current="PLAN" />
      </div>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!plans) return null;

  return (
    <>
      <PlanMarketHeader />

      <PlanMarketContent plans={plans} />

      <BottomNavBar current="PLAN" />
    </>
  );
}

export default PlanMarket;
