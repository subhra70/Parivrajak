import React from 'react'
import { useNavigate } from 'react-router-dom'

function Page404() {
    const navigate=useNavigate()
    const redirecctToHome=()=>{
        navigate("/")
    }
  return (
    <div className='w-screen left-0 top-0 absolute p-6'>
        <h1 className='text-left text-xl text-blue-800'>Page Not Found</h1>
        <p className='text-left text-md'> Your Requested Page Not Found</p>
        <button className='mx-auto md:text-left bg-blue-500 hover:bg-blue-700 rounded-md text-white' onClick={redirecctToHome}>Go To Homepage</button>
    </div>
  )
}

export default Page404