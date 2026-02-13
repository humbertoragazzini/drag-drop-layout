import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { GridDashboard } from './components/atoms/GridDashboard'
import './App.css'

function App() {

  return (
    <>
      <div className='h-screen w-screen bg-black p-4 overflow-auto'>
        <GridDashboard />
      </div>
    </>
  )
}

export default App
