import React from 'react'
import { useNavigate } from 'react-router-dom'

function Page404() {
    const navigate=useNavigate()
    const redirecctToHome=()=>{
        navigate("/")
    }
  return (
    <div className='w-screen left-0 top-0 absolute p-6 flex flex-col justify-center md:justify-start gap-4'>
        <h1 className='text-xl text-blue-800 font-bold'>Page Not Found</h1>
        <p className='text-md font-semibold'> Your Requested Page Not Found</p>
        <button className='mx-auto p-2 text-center bg-blue-500 hover:bg-blue-700 rounded-md text-white' onClick={redirecctToHome}>Go To Homepage</button>
    </div>
  )
}

export default Page404