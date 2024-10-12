import React from "react";
import { FiMic } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiPhoneOff } from "react-icons/fi";
const VideoCallInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-900 to-violet-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-30 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Call Room</h1>
        <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
          <Settings size={24} />
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex overflow-hidden">
        {/* Video grid */}
        <div className="flex-grow grid grid-cols-2 gap-4 p-4">
          {/* Main participant (You) */}
          <div className="col-span-2 row-span-2 relative bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/api/placeholder/1280/720"
              alt="Your video"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-3 py-1 rounded-full text-sm">
              You (Host)
            </div>
          </div>
          {/* Other participants */}
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={`/api/placeholder/640/360`}
                alt={`Participant ${num}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded-full text-xs">
                Participant {num}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Controls */}
      <footer className="bg-black bg-opacity-30 p-4">
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
            <FiMic size={24} />
          </button>
          <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
            <FiVideo size={24} />
          </button>
          <button className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors">
            <FiPhoneOff size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VideoCallInterface;
