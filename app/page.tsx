import AgeFilters from './components/pages/home/AgeFilters'
import Courses from './components/pages/home/Courses'
import SearchInput from './components/pages/home/SearchInput'

function Home() {
  return (
    <>
      <article className="w-full mt-2 pb-4 mb-4 flex flex-col gap-4 border-b border-dashed border-primary/40 ">
        <SearchInput />
        <AgeFilters />
      </article>
      <Courses />
    </>
  )
}

export default Home