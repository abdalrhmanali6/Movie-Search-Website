import { useState } from "react"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  const [isOpen,setisOpen]=useState<boolean>(true)
  return (
    <div className="relative">
        <Header setisOpen={setisOpen} isOpen={isOpen}/>
        <SideBar isOpen={isOpen} setisOpen={setisOpen}/>
        <main  className={`mb-10 pt-20 transition-all duration-300 ${
        isOpen ? "lg:ml-60" : "ml-0"
        }`}>
          <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout