import { useEffect } from "react";

const useClickOutside = (refs, closeMenu) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      if (clickedOutside) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, closeMenu]);
};

export default useClickOutside;
