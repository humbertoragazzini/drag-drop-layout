import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainGrid } from './components/organisms/MainGrid'

function App() {

  return (
    <>
      <div className='h-screen w-screen bg-black'>
        <MainGrid>
          <div className="bg-red-500 h-32 col-span-12 @sm:col-span-6 @lg:col-span-4 rounded-lg flex items-center justify-center text-white font-bold">1</div>
          <div className="bg-blue-500 h-32 col-span-12 @sm:col-span-6 @lg:col-span-4 rounded-lg flex items-center justify-center text-white font-bold">2</div>
          <div className="bg-green-500 h-32 col-span-12 @sm:col-span-6 @lg:col-span-4 rounded-lg flex items-center justify-center text-white font-bold">3</div>
          <div className="bg-yellow-500 h-32 col-span-12 @md:col-span-6 @xl:col-span-8 rounded-lg flex items-center justify-center text-white font-bold">4</div>
          <div className="bg-purple-500 h-32 col-span-12 @md:col-span-6 @xl:col-span-4 rounded-lg flex items-center justify-center text-white font-bold">5</div>
          <div className="bg-pink-500 h-32 col-span-6 @lg:col-span-3 rounded-lg flex items-center justify-center text-white font-bold">6</div>
          <div className="bg-indigo-500 h-32 col-span-6 @lg:col-span-3 rounded-lg flex items-center justify-center text-white font-bold">7</div>
          <div className="bg-teal-500 h-32 col-span-6 @lg:col-span-3 rounded-lg flex items-center justify-center text-white font-bold">8</div>
          <div className="bg-orange-500 h-32 col-span-6 @lg:col-span-3 rounded-lg flex items-center justify-center text-white font-bold">9</div>
          <div className="bg-gray-500 h-32 col-span-12 rounded-lg flex items-center justify-center text-white font-bold">10</div>
        </MainGrid>
      </div>
    </>
  )
}

export default App
