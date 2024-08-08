import React, { useState } from "react";

type Tab = {
    label: string;
    content: React.ReactNode;
}

type TabsProps = {
    tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex text-black justify-center gap-6 py-2 mb-4">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        className={`py-2 px-8 border-2 
                        hover:border-light-100 hover:rounded transition duration-150
                        focus:bg-light-100 focus:rounded focus:border-light-100 focus:text-white focus:font-semibold`}
                        onClick={() => setActiveTab(i)}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="text-black flex justify-center items-center py-2 px-4">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}

export default Tabs;