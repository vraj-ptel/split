import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='container mx-auto flex border-4 rounded-md p-4 flex-col items-center justify-center h-[calc(100vh-100px)]'>
      <h1 className='text-6xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-4'>404</h1>
      <h2 className='text-2xl font-bold mb-4'>Page not found</h2>
      <Link href={"/"}>Return home</Link>
    </div>
  )
}

export default NotFound
