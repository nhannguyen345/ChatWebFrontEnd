import React, { useRef, useState } from "react";
import HeaderOfLeftPanel from "../HeaderOfLeftPanel";
import ListChat from "../ChatsPanelComps/ListChat";

const ChatsPanel = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    type: 1,
    value: "All Chats",
  });

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
    <div className="w-full h-screen flex flex-col max-sm:h-[calc(100vh-64px)]">
      <HeaderOfLeftPanel
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        handleDebounceSearch={handleDebounceSearch}
      />
      <ListChat selectedFilter={selectedFilter} searchString={searchString} />
    </div>
  );
};

export default ChatsPanel;
