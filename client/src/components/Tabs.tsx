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
            <div className="flex max-md:flex-col text-gray-800 justify-center md:gap-6 max-md:gap-4 py-2 mb-4 mx-4">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        className={`py-2 md:px-16 border rounded
                        border-gray-800 bg-light-20 text-gray-800 font-semibold
                        hover:bg-gray-800 hover:text-light-20
                        focus:bg-gray-800 focus:text-light-20
                        `}
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