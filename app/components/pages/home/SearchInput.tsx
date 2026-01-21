function SearchInput() {
    return (
        <div className="relative w-full flex items-center">
            <input type="text" id="search" name="search" placeholder="امروز میخوای چی یاد بگیری؟" className="w-full outline outline-primary-light rounded-full py-3 pl-4 pr-11 shadow-sm shadow-primary-light placeholder:text-primary-dark/30 text-primary-dark" />
            <label htmlFor="search" className="absolute right-4 ">🔎</label>
        </div>
    )
}

export default SearchInput