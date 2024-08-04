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
            <div className="flex text-black justify-center gap-2 py-2">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        className={`py-2 px-8 border-2`}
                        onClick={() => setActiveTab(i)}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="text-black flex justify-center items-center py-2">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}

export default Tabs;