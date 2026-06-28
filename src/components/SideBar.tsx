import { Search ,Clapperboard,Tv,Compass} from "lucide-react";
import SideBarLinks from "./SideBarLinks";
import type{ SideBarLinksProps } from "./SideBarLinks";

const links:SideBarLinksProps[]=[
    {
        icon:<Search/>,
        text:"Explore",
        to:"/"
    },
    {
        icon:<Clapperboard/>,
        text:"Movies",
        to:"/movie"
    },
    {
        icon:<Tv/>,
        text:"Tv Show",
        to:"/tv"
    },
     {
        icon:<Compass />,
        text:"Discovery",
        to:"/discovery"
    },
    
]

type SideBarProps={
    isOpen:boolean
    setisOpen:(value:boolean)=>void
}

const SideBar = ({isOpen,setisOpen}:SideBarProps) => {
  return (
    <aside className={`${!isOpen&&`hidden`} fixed z-50 top-20 bottom-0 h-screen w-60 flex flex-col gap-3 bg-surface/90 lg:bg-surface pl-4 pr-3 pt-5`}>
         {links.map((link:SideBarLinksProps,index)=>(
             <SideBarLinks key={index} setisOpen={setisOpen} icon={link.icon} text={link.text} to={link.to} />
         ))
         }
         
    </aside>
  )
}

export default SideBar