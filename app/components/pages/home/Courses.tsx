"use client"
import { useLessonsStore } from '@/app/context/useLessonsStore'
import { Lesson } from '@/app/lib/Types'
import Button from '../../ui/Button';
import Link from 'next/link';
import Stars from '../../ui/Stars';
import PlayIcon from '../../icons/PlayIcon';

function Courses() {
  const lessons = useLessonsStore((s) => s.sorted)
  return (
    <article className='flex flex-col gap-3 cnt py-4 '>
      {lessons.map((item) => <Course key={item.id} data={item} />)}
    </article>
  )
}

function Course({ data }: { data: Lesson }) {
  const resetLessonStars = useLessonsStore((s) => s.resetLessonStars)
  const stars = useLessonsStore((s) => s.stars)[data.id]
  return <div className='w-full bg-white flex px-3 p-4 border border-primary-light rounded-3xl min-h-30 shadow '>
    <div className='w-full flex flex-col justify-between'>
      <p className='flex items-center gap-2 '>
        <span className='h-4 text-2xl/[80%] '>{data.icon}</span>
        <span className='text-lg font-bold'>{data.title}</span>
      </p>
      <Stars quantity={stars} />

    </div>
    <div className='w-full flex flex-col justify-between items-end '>
      <p className='text-xs text-primary-dark/80'> از {data.ageMin} تا {data.ageMax} سال</p>
      <Link href={`/courses/${data.id}`} className='min-w-1/2'>
        <Button className='w-full h-8  px-4 text-xs items-center flex justify-center gap-1 fill-white' onClick={() => { resetLessonStars(data.id) }} isActive='active' color='green'><PlayIcon className='w-5' />شروع کن</Button>
      </Link>
    </div>
  </div>
}

export default Courses
