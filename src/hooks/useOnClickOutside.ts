import { RefObject, useEffect } from "react";

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  fn: (event: MouseEvent | TouchEvent) => void
) => {
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      ref.current &&
      event.target instanceof Element &&
      !ref.current.contains(event.target)
    ) {
      fn(event);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, fn]);
};

export default useOnClickOutside;
