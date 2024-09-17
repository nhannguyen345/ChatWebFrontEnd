import React from "react";
import ResponsiveMenu from "../components/ResponsiveMenu";

const Dashboard = () => {
  return (
    <div className="flex flex-row overflow-hidden w-screen max-sm:relative">
      <ResponsiveMenu />
    </div>
  );
};

export default Dashboard;
