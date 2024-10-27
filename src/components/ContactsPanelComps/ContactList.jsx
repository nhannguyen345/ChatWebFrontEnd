import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";

const ContactList = ({ searchString, contacts, loading, error }) => {
  return (
    <div className="flex-grow divide-gray-200 overflow-y-scroll no-scrollbar">
      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <ImSpinner className="animate-spin h-[36px] w-[36px]" />
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {contacts &&
        !loading &&
        !error &&
        contacts
          .filter((contact) => {
            if (searchString === "") return true;
            return contact.username.includes(searchString);
          })
          .map((contact, index) => (
            <React.Fragment key={contact.username}>
              {(index === 0 ||
                contact.letter !== contacts[index - 1].letter) && (
                <div className="px-4 pb-2 pt-4 gap-2 bg-gray-50 text-sm font-medium text-gray-500 border-y">
                  {contact.letter}
                </div>
              )}
              <div className="pl-8 pr-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={contact.image}
                    alt={contact.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {contact.username}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <BsThreeDotsVertical className="text-[20px]" />
                </button>
              </div>
            </React.Fragment>
          ))}
    </div>
  );
};

export default ContactList;
