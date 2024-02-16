import { useEffect, useState } from "react";

export default function useCloseSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return { toggleCollapse, isCollapsed };
}
