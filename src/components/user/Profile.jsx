import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { CgProfile } from 'react-icons/cg'

export default function Profile() {
    const {user} = useContext(AppContext)
  return (
    <>
        <div>
            <div className='text-center text-3xl my-8 mx-8 flex justify-center items-center h-screen'>
            <div className=' shadow-sm text-white shadow-white backdrop-blur-3xl p-8 mt-[-200px] space-y-2'>
            <CgProfile size={80} className='mx-[70px] text-white'/> 
            <h1>Welcome , {user?.name}</h1>
            <h1> {user?.email}</h1>
            </div>
            </div>
        </div>
    </>
  )
}
