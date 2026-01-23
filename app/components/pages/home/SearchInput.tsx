"use client"
import { useLessonsStore } from "@/app/context/useLessonsStore"
import SearchIcon from "../../icons/SearchIcon"

function SearchInput() {
    const searchTitle = useLessonsStore((s) => s.searchTitle)
    const setSearchTitle = useLessonsStore((s) => s.setSearchTitle)
    return (
        <div className="relative w-full flex items-center">
            <input type="text" id="search" name="search" placeholder="امروز میخوای چی یاد بگیری؟" className="text-xs w-full outline outline-primary-light rounded-full py-3 pl-4 pr-11 shadow-sm shadow-primary-light placeholder:text-primary-dark/30 text-primary-dark" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)} />
            <label htmlFor="search" className="absolute right-4"><SearchIcon className="stroke-primary w-4 h-4"/></label>
        </div>
    )
}

export default SearchInput