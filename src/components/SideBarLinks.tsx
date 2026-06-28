import { NavLink } from "react-router-dom"

 export type SideBarLinksProps={
    icon:React.JSX.Element
    text:string
    to:string
    setisOpen?:(value:boolean)=>void
}



const SideBarLinks = ({icon,text,to,setisOpen}:SideBarLinksProps) => {

  const handleclick=()=>{
  if(to==="/discovery"&& setisOpen){
     setisOpen(false)
  }else{
    return null
  }
} 
  return (
     <NavLink to={to}  className="text-Tertairy flex gap-5 px-2 font-bold rounded-xl  py-3 "
      onClick={handleclick}
     >
            {icon}
             <span>{text}</span>
        </NavLink>
  )
}

export default SideBarLinks