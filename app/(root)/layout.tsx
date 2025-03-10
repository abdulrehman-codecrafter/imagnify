import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <main className='root'>
        <MobileNav />
        <Sidebar />
        <div className='root-container'>
        {children}
        </div>
        
    </main>
  )
}
