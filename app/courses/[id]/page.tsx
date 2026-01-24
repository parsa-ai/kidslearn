"use client"
import Button from "@/app/components/ui/Button";
import Div from "@/app/components/ui/Div";
import { useLessonsStore } from "@/app/context/useLessonsStore";
import { AgesList } from "@/app/lib/data/AgesList";
import { ChevronLeft } from "lucide-react";
import Link from "next/link"
import { useParams } from "next/navigation";
import { useState } from "react";

function CoursePage() {
  const { id } = useParams()
  const lessons = useLessonsStore((s) => s.lessons)
  const ages = useLessonsStore((s) => s.selectedAge)
  const CourseColor = AgesList.filter((i) => i.age == ages)[0].color
  const [itemIndex, setItemIndex] = useState(0)
  const lesson = lessons.find((i) => i.id == id)
  const question = lesson?.questions[itemIndex]
  if (!lessons.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    )
  }

  if (!lesson || !question) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        <p>404 صفحه مورد نظر یافت نشد</p>
        <Link href={"/"} className="text-3xl text-primary underline">برگشت به خانه</Link>
      </div>
    )
  }
  return (
    <article className="cnt  py-6 h-full flex flex-col gap-5">
      <header className="flex justify-between items-center gap-4">
        <h1 className="text-xl text-primary-dark/80 font-bold text-right  flex  ">
          <span className="pl-4">
            {lesson.icon}
          </span>
          {lesson.title}
        </h1>
        <Link href={"/"} className="text-md text-primary-dark/30 flex gap-1 items-center">خانه<ChevronLeft /></Link>
      </header>

      <div className="h-full w-full flex flex-col justify-between gap-5 ">
        <div className="h-fit rounded-3xl! flex justify-center items-center" >
          <Button className={`min-w-12 h-6 text-sm border`} color={CourseColor} isActive="active" onClick={() => { setItemIndex(0) }}>1</Button>
          <Div className="w-full h-[0.5px] outline-0 -z-20 relative" color={itemIndex >= 1 ? CourseColor : "gray"} isActive="active" />
          <Button className={`min-w-12 h-6 text-sm ${itemIndex >= 1 ? "border" : ""}`} color={itemIndex >= 1 ? CourseColor : "gray"} isActive={itemIndex >= 1 ? "active" : "deactive"} onClick={() => { setItemIndex(1) }}>2</Button>
          <Div className="w-full h-[0.5px] outline-0 -z-20 relative" color={itemIndex >= 2 ? CourseColor : "gray"} isActive="active" />
          <Button className={`min-w-12 h-6 text-sm ${itemIndex >= 2 ? "border" : ""}`} color={itemIndex >= 2 ? CourseColor : "gray"} isActive={itemIndex >= 2 ? "active" : "deactive"} onClick={() => { setItemIndex(2) }}>3</Button>
        </div>
        <Div color={CourseColor} className="rounded-3xl! h-11/12 w-full justify-between flex flex-col px-4 py-6" >
          <p className="text-right font-bold text-3xl">
            {question.q}
          </p>
          <ul className="flex w-full justify-center gap-4 flex-col">
            {question.choices.map((choice, j) => {
              return (
                <li key={j} className="w-full" >
                  <Button color={CourseColor} className="w-full py-2 h-12 text-2xl" isActive="active">{choice}</Button>
                </li>
              )
            })}
          </ul>
        </Div >

      </div>

    </article>
  )
}

export default CoursePage