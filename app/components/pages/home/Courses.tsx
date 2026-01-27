"use client"

import { AnimatePresence, motion } from "motion/react"
import { useLessonsStore } from '@/app/context/useLessonsStore'
import { AgesList } from '@/app/lib/data/AgesList';
import Course from './Course';

function Courses() {
  const lessons = useLessonsStore((s) => s.sorted)
  const ages = useLessonsStore((s) => s.selectedAge)
  const CourseColor = AgesList.filter((i) => i.age == ages)[0].color
  const getStars = useLessonsStore((s) => s.getLessonStars)

  return (
    <article
      className='h-fit w-full overflow-x-hidden flex flex-col gap-3 cnt py-4'
    >
      <AnimatePresence mode='wait'>
        {lessons.map((item, i) => {
          const stars = getStars(item.id)
          return (
            <motion.div
              key={`${item.id}-${stars}-${ages}`}
              initial={{ x: "-150%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.16, delay: 0.09 * i }}
              exit={{ x: "150%" , opacity: 0}}>
              <Course data={item} CourseColor={CourseColor} stars={stars} />
            </motion.div>
          )
        })
        }
      </AnimatePresence>
    </article>
  )
}

export default Courses