import { useLessonsStore } from "@/app/context/useLessonsStore"
import { Color, Lesson } from "@/app/lib/Types"
import Button from "../../ui/Button"
import Stars from "../../ui/Stars"
import Link from "next/link"
import PlayIcon from "../../icons/PlayIcon"
import Div from "../../ui/Div"

export default function Course({ data, CourseColor }: { data: Lesson, CourseColor: Color }) {
  const resetLessonStars = useLessonsStore((s) => s.resetLessonStars)
  const stars = useLessonsStore((s) => s.stars)[data.id]
  return (
    <Div color={CourseColor} className='w-full bg-white flex p-3  rounded-3xl! min-h-32 shadow flex-col justify-between'>
      <div className='flex'>
        <div className='flex justify-center items-center py-2 ml-3'>
          <span className='h-4 text-2xl/[80%]  '>{data.icon}</span>
        </div>
        <div className='w-full flex flex-col justify- gap-1'>
          <p className='flex items-center gap-2 '>
            <span className='text-lg font-bold'>{data.title}</span>
          </p>
          <span className='text-xs border-0 outline-0 text-primary-dark/50 text-right'> از {data.ageMin} تا {data.ageMax} سال</span>

        </div>
        <div className='w-full flex flex-col justify-between gap-5 items-end '>
          <Stars quantity={stars} className='flex justify-end' />

        </div>
      </div>
      <Link href={`/courses/${data.id}`} className='w-full'>
        <Button className='w-full h-8 px-4 text-xs items-center flex justify-center gap-1 fill-white' onClick={() => { resetLessonStars(data.id) }} isActive='active' color={CourseColor}><PlayIcon className='w-5' />شروع کن</Button>
      </Link>
    </Div>
  )
}