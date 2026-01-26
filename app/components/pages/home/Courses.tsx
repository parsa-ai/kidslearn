"use client"

import { useLessonsStore } from '@/app/context/useLessonsStore'
import { AgesList } from '@/app/lib/data/AgesList';
import Course from './Course';

function Courses() {
  const lessons = useLessonsStore((s) => s.sorted)
  const ages = useLessonsStore((s) => s.selectedAge)
  const CourseColor = AgesList.filter((i) => i.age == ages)[0].color
  const getStars = useLessonsStore((s) => s.getLessonStars)

  return (
    <article className='flex flex-col gap-3 cnt py-4 overflow-x-hidden'>
      {lessons.map((item) => {
        const stars = getStars(item.id)
        return (
          <Course key={`${item.id}-${stars}`} data={item} CourseColor={CourseColor} stars={stars} />
        )
      })
      }
    </article >
  )
}

export default Courses