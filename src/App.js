import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RootPage from "./components/login/RootPage.components";
import LoginPage from "./components/login/LoginPage.components";
import Onboard1 from "./components/onboard/onboard1.components";
import Onboard2 from "./components/onboard/onboard2.components";
import Onboard3 from "./components/onboard/onboard3.components";
import ViewTemplate from "./components/viewtemplate/viewtemplate.components";
import SearchTemplate from "./components/searchtemplate/searchtemplate.components";
import Todo from "./components/todo/Todo.components";

import MyPlan from "./components/myplan/MyPlan.components";
import Settings from "./components/settings/settings.components";
import TodoDetail from "./components/todo/detail/TodoDetail.components";
import PlanDetail from "./components/todo/plan/PlanDetail.components";
import PlanMarket from "./components/planmarket/PlanMarket.components";
import PlanMarketDetail from "./components/planmarket/PlanMarketDetailOld.components";
import Proposal from "./components/proposal/Proposal.components";
import KakaoSocial from "./components/social/KakaoSocial.components";
import GoogleSocial from "./components/social/GoogleSocial.components";
import Admin from "./components/admin/admin.components";
import Copyright from "./components/globalcomponents/Copyright";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login/kakao/:code" element={<KakaoSocial />} />
        <Route path="/auth/google/callback" element={<GoogleSocial />} />

        <Route path="/onboard1" element={<Onboard1 />} />
        <Route path="/onboard2" element={<Onboard2 />} />
        <Route path="/onboard3" element={<Onboard3 />} />

        <Route path="/todo" element={<Todo />} />

        <Route path="/myplan" element={<MyPlan />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/planmarket" element={<PlanMarket />} />
        <Route path="/proposal" element={<Proposal />} />

        <Route path="/planmarket/plan/:id" element={<PlanMarketDetail />} />
        <Route path="/main/viewtemplate/:id" element={<ViewTemplate />} />
        <Route path="/main/searchtemplate" element={<SearchTemplate />} />

        <Route path="todo/detail/:id" element={<TodoDetail />} />
        <Route path="/todo/plan/:id" element={<PlanDetail />} />

        <Route path="/copyright" element={<Copyright />} />
      </Routes>
    </div>
  );
}

export default App;
