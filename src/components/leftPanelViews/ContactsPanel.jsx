import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ContactList from "../ContactsPanelComps/ContactList";
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
  return (
    <div className="max-w-md w-full flex flex-col bg-white shadow-lg rounded-lg">
      <HeaderOfLeftPanel />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactsPanel;
