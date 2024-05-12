import { useEffect } from "react";

export default function useClickOutside(ref:React.RefObject<HTMLElement> , onClickOutside: () => void){
    useEffect(() => {
      /**
       * Invoke Function onClick outside of element
       */
    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClickOutside();
        }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // dispose
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  }