'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
export type State =
    | {
          status: 'success'
          message: string
          data: {
              firstName: string
              lastName: string
          }
      }
    | {
          status: 'error'
          message: string
          errors?: Array<{
              path: string
              message: string
          }>
      }
    | null

const getUserForm = async (
    prevState: State | null,
    data: FormData,
): Promise<State> => {
    console.log('DATA', data)
    revalidatePath('/user/info')
    redirect('/user/info')
    // return {
    //     status: 'success',
    //     message: `Welcome, ${data.get('firstName')} ${data.get('lastName')}!`,
    //     data: {
    //         firstName: data.get('firstName') as string,
    //         lastName: data.get('lastName') as string,
    //     },
    // }
}

export default getUserForm
