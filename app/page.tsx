import AgeFilters from './components/pages/home/AgeFilters'
import SearchInput from './components/pages/home/SearchInput'

function Home() {
  return (
    <>
      <article className="w-full mt-2 mb-4 flex flex-col gap-4">
        <SearchInput />
        <AgeFilters />
      </article>
    </>
  )
}

export default Home