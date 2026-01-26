"use client"
import { useLessonsStore } from "@/app/context/useLessonsStore"
import SearchIcon from "../../icons/SearchIcon"

function SearchInput() {
    const searchTitle = useLessonsStore((s) => s.searchTitle)
    const setSearchTitle = useLessonsStore((s) => s.setSearchTitle)
    return (
        <div className="relative w-full flex items-center">
            <input type="text" id="search" name="search" placeholder="امروز میخوای چی یاد بگیری؟" className="text-base w-full outline outline-primary-light rounded-full py-2 pl-4 pr-11 shadow-sm shadow-primary-light placeholder:text-primary-dark/30 text-primary-dark" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
            <label htmlFor="search" className="absolute right-4 flex justify-center items-center">
                <SearchIcon className="stroke-primary w-5 h-5" />
                <SearchIcon className="stroke-primary w-5 h-5 absolute blur-sm" />
            </label>
        </div>
    )
}

export default SearchInput