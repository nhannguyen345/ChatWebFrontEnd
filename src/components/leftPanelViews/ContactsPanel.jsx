import React from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ContactList from "../ContactsPanelComps/ContactList";
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from "react-redux";

const ContactsPanel = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const { data, loading, error } = useFetchData(
    `http://localhost:8080/friend/get-contacts-list`,
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
