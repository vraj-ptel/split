"use client"
import { CurrencyProvider } from '@/components/currencyContext'
import { Authenticated } from 'convex/react'
import React from 'react'

const layout = ({children}) => {
  return (
    <Authenticated>
      <CurrencyProvider>
        <div className="container mx-auto  px-4">{children}</div>
      </CurrencyProvider>
      
    </Authenticated>
  )
}

export default layout