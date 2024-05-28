'use client'

import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
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
    className?: string
}

const BasicTabs: React.FC<BasicTabsProps> = ({ tabs }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    interface StyledTabsProps {
        children?: React.ReactNode
        value: number
        onChange: (event: React.SyntheticEvent, newValue: number) => void
    }

    const StyledTabs = styled((props: StyledTabsProps) => (
        <Tabs
            {...props}
            TabIndicatorProps={{
                children: <span className="MuiTabs-indicatorSpan" />,
            }}
        />
    ))({
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            height: '4px',
            minWidth: '70px',
            backgroundColor: '#0FF',
        },
    })
    interface StyledTabProps {
        label: string
    }

    const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
        () => ({
            textTransform: 'none',
            fontSize: '16px',
            color: '#FFFFFF',
            '&.Mui-selected': {
                color: '#0FF',
            },
            '&.Mui-focusVisible': {
                backgroundColor: '#0FF',
            },
        }),
    )
    return (
        <Box sx={{ width: '100%' }}>
            <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example">
                {tabs.map(({ label }, i) => (
                    <StyledTab label={label} key={i} {...a11yProps(i)} />
                ))}
            </StyledTabs>
            {tabs.map(({ Component }, i) => (
                <CustomTabPanel value={value} index={i} key={i}>
                    {Component}
                </CustomTabPanel>
            ))}
        </Box>
    )
}

export default BasicTabs
