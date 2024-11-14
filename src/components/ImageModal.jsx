import React from "react";
import { IoMdClose } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { closeImageModal } from "../features/modal/modalSlice";

const ImageModal = () => {
  const dispatch = useDispatch();
  const imageState = useSelector((state) => state.modal.isImageModalOpen);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div className="relative max-h-[95vh] max-w-[95vw] flex flex-col">
        {/* Nút đóng */}
        <button
          onClick={() => dispatch(closeImageModal())}
          className="w-[76vw] mb-5 flex justify-end text-white hover:text-gray-300"
        >
          <IoMdClose className="h-8 w-8" />
        </button>
        <a
          className="absolute top-0 left-1/2 -translate-x-1/2"
          href={imageState.imageUrl}
          download={`${imageState.imageUrl.split("/").pop()}`}
          target="_blank"
          rel="noreferrer"
        >
          <button className=" flex items-center gap-2 text-white hover:text-gray-300">
            <FiDownload className="h-6 w-6" />
            <span>Download</span>
          </button>
        </a>
        {/* Hình ảnh */}
        <img
          src={imageState.imageUrl}
          alt="Full screen"
          className="max-h-[86vh] max-w-[80vw] object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
