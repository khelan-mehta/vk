"use client";

import { useState } from "react";
import clsx from "clsx";

interface Tab {
  id: number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: number;
  onTabChange?: (tab: Tab) => void;
}

export default function Tabs({
  tabs,
  defaultActiveId = 1,
  onTabChange,
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultActiveId);

  const handleTabChange = (id: number) => {
    setActiveTabId(id);
    const activeTab = tabs.find((tab) => tab.id === id);
    if (onTabChange && activeTab) onTabChange(activeTab);
  };

  return (
    <div className="flex bg-greenBlueCustom-2 justify-between rounded-md  h-[2rem] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={clsx(
            "flex justify-center h-[1.5rem] items-center px-4 py-1 text-sm font-medium transition-all duration-200 rounded-md",
            activeTabId === tab.id
              ? "bg-greenBlueCustom-3  text-white"
              : "text-black "
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
