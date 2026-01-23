"use client"
import { useLessonsStore } from '@/app/context/useLessonsStore'
import { AgesList } from '@/app/lib/data/AgesList';
import Course from './Course';

function Courses() {
  const lessons = useLessonsStore((s) => s.sorted)
  const ages = useLessonsStore((s) => s.selectedAge)
  const CourseColor = AgesList.filter((i) => i.age == ages)[0].color
  return (
    <article className='flex flex-col gap-3 cnt py-4 '>
      {lessons.map((item) => <Course key={item.id} data={item} CourseColor={CourseColor} />)}
    </article>
  )
}

export default Courses