import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmployeCrud from './Components/EmployeeCrud/EmployeCrud'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <EmployeCrud/>
    </>
  )
}

export default App
