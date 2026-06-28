import { Search, Bell, Menu } from "lucide-react";
import Thor from "../assets/Thor.png";
import {  useState } from "react";
import useFilterData from "../hooks/useFilterData";
import type { FilterData } from "../types/types";
import useDebounce from "../hooks/useDebounce";
import SearchDropDown from "./search/SearchDropDown";
import { useNavigate } from "react-router-dom";
import useSearchMedia from "../hooks/useSearchMedia";

type HeaderProps = {
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const Header = ({ setisOpen, isOpen }: HeaderProps) => {
  const { search } = useFilterData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState<FilterData["search"]>(search);
  const debounceValue = useDebounce(localSearch);
  const {media_Types}=useSearchMedia()
  const navigate=useNavigate()
 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsDropdownOpen(false);
      if (localSearch && localSearch.trim() !== "") {
        navigate(`/${media_Types}/SearchResult?search=${encodeURIComponent(localSearch.trim())}`);
      }
    }
  };
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-surface-variant/10 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
      <div className="flex gap-5 items-center">
        <Menu
          color="#94A3B8"
          className="cursor-pointer"
          onClick={() => setisOpen(!isOpen)}
        />
        <h1 className="font-headline-lg lg:text-headline-lg  md:text-headline-lg-mobile font-bold tracking-tighter text-primary-container ">
          CINMA VERSE
        </h1>
      </div>
      <div className=" flex-1 flex justify-center relative ml-2">
        <div className="relative md:w-1/2 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-surface-bright pl-12 p-3 rounded-full outline-none"
            value={localSearch ?? ""}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setIsDropdownOpen(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        {isDropdownOpen && (
          <SearchDropDown
            open={isDropdownOpen}
            setOpen={setIsDropdownOpen}
            setLocalSearch={setLocalSearch}
            search={debounceValue}
          />
        )}
      </div>
      <div className="lg:flex gap-5 hidden ">
        <Bell color="#94A3B8" />
        <img src={Thor} alt="profile picture" className="size-7 rounded-3xl" />
      </div>
    </header>
  );
};

export default Header;
