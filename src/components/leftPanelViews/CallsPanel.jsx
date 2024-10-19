import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import CallList from "../CallsPanelComps/CallList";
import { useSelector } from "react-redux";
const callData = [
  {
    id: 1,
    name: "Catherine Richardson",
    time: "Just now",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  { id: 2, name: "Eva Walker", time: "5 mins ago", initials: "EW" },
  {
    id: 3,
    name: "Christopher Garcia",
    time: "20 mins ago",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
    missed: true,
  },
  {
    id: 4,
    name: "Christina Turner",
    time: "4 hour ago",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 5,
    name: "Tammy Martinez",
    time: "Yesterday",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 6,
    name: "Bonnie Torres",
    time: "12/06/2020",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
];

const CallsPanel = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const { data, loading, error } = useFetchData(
    `http://localhost:8080/call/get-list-calls`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  return (
    <div className="w-full h-screen flex flex-col">
      <HeaderOfLeftPanel />
      <CallList callData={data} loading={loading} error={error} />
    </div>
  );
};

export default CallsPanel;
