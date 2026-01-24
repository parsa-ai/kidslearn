"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import Button from "@/app/components/ui/Button"
import Div from "@/app/components/ui/Div"
import { useLessonsStore } from "@/app/context/useLessonsStore"
import { AgesList } from "@/app/lib/data/AgesList"
import { Color } from "@/app/lib/Types"

function CoursePage() {
  const { id } = useParams<{ id: string }>()
  const lessons = useLessonsStore((s) => s.lessons)
  const selectedAge = useLessonsStore((s) => s.selectedAge)

  const [questionIndex, setQuestionIndex] = useState(0)

  const lesson = useMemo(
    () => lessons.find((l) => l.id === id),
    [lessons, id]
  )

  const question = lesson?.questions?.[questionIndex]

  const courseColor = useMemo(
    () => AgesList.find((a) => a.age === selectedAge)?.color ?? "gray",
    [selectedAge]
  )


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
        <p>۴۰۴ | صفحه مورد نظر یافت نشد</p>
        <Link href="/" className="text-xl text-primary underline">
          برگشت به خانه
        </Link>
      </div>
    )
  }

  return (
    <article className="cnt py-6 h-full flex flex-col gap-5">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary-dark/80 flex items-center gap-3">
          <span>{lesson.icon}</span>
          {lesson.title}
        </h1>

        <Link
          href="/"
          className="flex items-center gap-1 text-primary-dark/40"
        >
          خانه <ChevronLeft />
        </Link>
      </header>

      <div className="flex flex-col justify-between h-full gap-6">

        <div className="flex items-center">
          {lesson.questions.map((_, i) => (
            <Step
              key={i}
              index={i}
              activeIndex={questionIndex}
              color={courseColor}
              onClick={() => setQuestionIndex(i)}
            />
          ))}
        </div>

        <Div
          color={courseColor}
          className="rounded-3xl! flex flex-col justify-between px-4 py-6 flex-1"
        >
          <p className="text-right font-bold text-3xl">
            {question.q}
          </p>

          <ul className="flex flex-col gap-4">
            {question.choices.map((choice, i) => (
              <li key={i}>
                <Button
                  color={courseColor}
                  isActive="active"
                  className="w-full h-12 text-2xl"
                >
                  {choice}
                </Button>
              </li>
            ))}
          </ul>
        </Div>
      </div>
    </article>
  )
}

export default CoursePage

function Step({
  index,
  activeIndex,
  color,
  onClick,
}: {
  index: number
  activeIndex: number
  color: Color
  onClick: () => void
}) {
  const isActive = index <= activeIndex

  return (
    <>
      {index > 0 && (
        <Div
          className="w-full h-[0.5px]"
          color={isActive ? color : "gray"}
          isActive="active"
        />
      )}
      <Button
        onClick={onClick}
        color={isActive ? color : "gray"}
        isActive={isActive ? "active" : "deactive"}
        className={`min-w-12 h-6 text-sm ${isActive ? "border" : ""}`}
      >
        {index + 1}
      </Button>

    </>
  )
}
