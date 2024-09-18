import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ContactList = ({ contacts }) => {
  return (
    <div className="flex-grow divide-gray-200 overflow-y-scroll no-scrollbar">
      {contacts.map((contact, index) => (
        <React.Fragment key={contact.name}>
          {(index === 0 || contact.letter !== contacts[index - 1].letter) && (
            <div className="px-4 pb-2 pt-4 gap-2 bg-gray-50 text-sm font-medium text-gray-500 border-y">
              {contact.letter}
            </div>
          )}
          <div className="pl-8 pr-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              {contact.image ? (
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white ${contact.color}`}
                >
                  {contact.initials}
                </div>
              )}
              <span className="text-sm font-medium text-gray-900">
                {contact.name}
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
