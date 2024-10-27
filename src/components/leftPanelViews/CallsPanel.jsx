import React, { useRef, useState } from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import CallList from "../CallsPanelComps/CallList";
import { useSelector } from "react-redux";

const CallsPanel = () => {
  const { listCall, loading, error } = useSelector((state) => state.callList);
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
    <div className="w-full h-screen flex flex-col">
      <HeaderOfLeftPanel handleDebounceSearch={handleDebounceSearch} />
      <CallList
        searchString={searchString}
        callData={listCall}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CallsPanel;
