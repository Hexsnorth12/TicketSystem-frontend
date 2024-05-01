'use client'

import React, { useState } from 'react'
interface TabProps {
  children: React.ReactNode
}
const Tab: React.FC<TabProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div>
      <div className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {React.Children &&
          React.Children.map(children, (child, index) => (
            <button
              className={`active  border-1 inline-block rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500 ${
                index === activeTab ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleTabClick(index)}>
              {child && (child as React.ReactElement).props.title}
            </button>
          ))}
      </div>
      <div>
        {React.Children.map(children, (child, index) => (
          <div className={index === activeTab ? '' : 'hidden'}>{child}</div>
        ))}
      </div>
    </div>
  )
}
interface TabPanelProps {
  title: string
  children: React.ReactNode // 添加 children 属性
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <>{children}</> // 渲染子元素
}

export default Tab
export { TabPanel }
