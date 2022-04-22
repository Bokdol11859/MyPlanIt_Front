import { useState, useEffect } from "react";
import axios from "axios";
import BottomNavBar from "../globalcomponents/BottomNavBar.components";
import MyPlanHeader from "./MyPlanHeader.components";
import MyPlanContent from "./MyPlanContent.components";
import LoadingScreen from "../globalcomponents/Loading.components";

function MyPlan() {
  const accessToken = sessionStorage.getItem("access");
  const [current, setCurrent] = useState("BUY");
  const [buyPlans, setBuyPlans] = useState([]);
  const [registerPlans, setRegisterPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyLength, setBuyLength] = useState(0);
  const [registerLength, setRegisterLength] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchRegisterPlans = async () => {
      try {
        const response = await axios.get(
          "https://myplanit.link/myplans/registered",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        setRegisterPlans(
          response.data.register_plans ? response.data.register_plans : []
        );
        setRegisterLength(
          response.data.register_plans ? response.data.register_plans.length : 0
        );
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchRegisterPlans();

    const fetchBuyPlans = async () => {
      try {
        const response = await axios.get("https://myplanit.link/myplans/buy", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response);
        setBuyPlans(response.data.buy_plans ? response.data.buy_plans : []);
        setBuyLength(
          response.data.buy_plans ? response.data.buy_plans.length : 0
        );
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchBuyPlans();
  }, [update]);

  if (error) return error;

  if (loading)
    return (
      <div>
        <LoadingScreen />
        <BottomNavBar current="TODO" />
      </div>
    );

  return (
    <>
      <MyPlanHeader
        current={current}
        setCurrent={setCurrent}
        buyLength={buyLength}
        registerLength={registerLength}
      />

      {current === "BUY" && <MyPlanContent plans={buyPlans} update={update} setUpdate={setUpdate} buy />}
      {current === "REGISTER" && (
        <MyPlanContent plans={registerPlans} update={update} setUpdate={setUpdate} register />
      )}

      <BottomNavBar current="TODO" />
    </>
  );
}

export default MyPlan;
