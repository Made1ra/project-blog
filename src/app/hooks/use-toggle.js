import { useState } from "react";

function useToggle(initialValue = false) {
  const [isToggled, setIsToggled] = useState(initialValue);

  const toggleValue = () => {
    setIsToggled((isToggled) => !isToggled);
  };

  return [isToggled, toggleValue];
}

export default useToggle;
