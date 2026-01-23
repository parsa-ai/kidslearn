import AgeFilters from './components/pages/home/AgeFilters'
import Courses from './components/pages/home/Courses'
import SearchInput from './components/pages/home/SearchInput'

function Home() {
  return (
    <>
      <article className="w-full pb-4 flex flex-col gap-4 border-b border-dashed border-primary/40 sticky top-0 bg-white cnt pt-4">
        <SearchInput />
        <AgeFilters />
      </article>
      <Courses />
    </>
  )
}

export default Home