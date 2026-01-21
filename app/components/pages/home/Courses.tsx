import { lessonList } from '@/app/lib/data/lessons'


function Courses() {
  return (
    <article>{lessonList.map((item)=>{
      return <p>{item.title}</p>
    })}</article>
  )
}

export default Courses