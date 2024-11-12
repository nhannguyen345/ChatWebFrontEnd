import React, { useRef, useState } from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ContactList from "../ContactsPanelComps/ContactList";
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { backendURL } from "../../utils/backendUrl";

const ContactsPanel = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const { data, loading, error } = useFetchData(
    `${backendURL}/friend/get-contacts-list`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  const [searchString, setSearchString] = useState("");
  const debounceTimeout = useRef(null);

  const handleDebounceSearch = (e) => {
    const valueInput = e.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchString(valueInput);
    }, 500);
  };

  return (
    <div className="max-w-md max-sm:h-[calc(100vh-64px)] w-full flex flex-col bg-white shadow-lg rounded-lg">
      <HeaderOfLeftPanel handleDebounceSearch={handleDebounceSearch} />
      <ContactList
        searchString={searchString}
        contacts={data}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ContactsPanel;
