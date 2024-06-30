
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './component/Navbar'
function App() {


  return (
    <>
    <Navbar/>
    <Outlet/>  
    <footer>Footer</footer>
    </>
  )
}

export default App
