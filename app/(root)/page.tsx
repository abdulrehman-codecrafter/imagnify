import { connectToDatabase } from '@/lib/database/moongoose'
import React from 'react'

export default function Home() {
    connectToDatabase()
  return (
    <div>
        <h1>Home</h1>
        
    </div>
  )
}
