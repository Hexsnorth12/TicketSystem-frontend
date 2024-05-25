'use client'

import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import clsx from 'clsx'
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
    className?: string
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, className, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div className={clsx(className)}>{children}</div>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

interface TabInfo {
    label: string
    Component: React.ReactNode
}

interface BasicTabsProps {
    tabs: TabInfo[]
}

const BasicTabs: React.FC<BasicTabsProps> = ({ tabs }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box className="w-full">
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example">
                    {tabs.map(({ label }, i) => (
                        <Tab label={label} key={i} {...a11yProps(i)} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map(({ Component }, i) => (
                <CustomTabPanel value={value} index={i} key={i}>
                    {Component}
                </CustomTabPanel>
            ))}
        </Box>
    )
}

export default BasicTabs
