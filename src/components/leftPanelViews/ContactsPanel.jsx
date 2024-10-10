import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ContactList from "../ContactsPanelComps/ContactList";
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from "react-redux";
const contacts = [
  { letter: "A", name: "Alvarez Luna", initials: "AL", color: "bg-pink-500" },
  {
    letter: "C",
    name: "Carla Serrano",
    image:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    letter: "D",
    name: "Dean Vargas",
    initials: "DV",
    color: "bg-purple-500",
  },
  {
    letter: "D",
    name: "Donaldson Riddle",
    image:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    letter: "D",
    name: "Daniels Webster",
    initials: "DW",
    color: "bg-blue-500",
  },
  {
    letter: "E",
    name: "Earnestine Sears",
    image:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    letter: "F",
    name: "Faulkner Benjamin",
    image:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
];

const ContactsPanel = () => {
  const jwt = localStorage.getItem("auth-tk-webchat");
  const user = useSelector((state) => state.auth.userInfo);
  const { data, loading, error } = useFetchData(
    `http://localhost:8080/friend/get-contacts-list/${user.info.id}`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  return (
    <div className="max-w-md w-full flex flex-col bg-white shadow-lg rounded-lg">
      <HeaderOfLeftPanel />
      <ContactList contacts={data} loading={loading} error={error} />
    </div>
  );
};

export default ContactsPanel;
