import { useCallback, useState } from "react";
import { Tabs } from "../interfaces";

const useTabs = (value: Tabs) => {
    const [ currentTab, setCurrentTab ] = useState<number>(0);
    let  tabs: string[] = [];
    if (value) {
        const role = value.role;
        value.tabs.forEach((tab) => {
          if (!tab.isAdminOnly || role === "Admin") {
            tabs.push(tab.name);
          }
        });
    };

    const navigateTab = useCallback((value: number) => {
        setCurrentTab(value);
    }, [ currentTab ]);


    return { 
        currentTab,
        navigateTab,
        tabs
    };
};

export default useTabs;