'use client' // This is a client component 👈🏽
import React from 'react'
import { Tab, TabPanel } from '../common'
import SingIn from './signIn'
import SignUp from './signUp'
export default function tabForm() {
  return (
    <main className="min-h-screen">
      <div className="">
        <Tab>
          <TabPanel title="Tab 1">
            <SingIn></SingIn>
          </TabPanel>
          <TabPanel title="Tab 2">
            <SignUp></SignUp>
          </TabPanel>
        </Tab>
      </div>
    </main>
  )
}
