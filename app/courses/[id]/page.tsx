"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useLessonsStore } from "@/app/context/useLessonsStore"
import { AgesList } from "@/app/lib/data/AgesList"
import { ModalType } from "@/app/lib/Types"
import Steps from "@/app/components/pages/courseSingle/Steps"
import Modal from "@/app/components/pages/courseSingle/Modal"

import { AnimatePresence } from "motion/react"
import CourseCard from "@/app/components/pages/courseSingle/CourseCard"

export default function CoursePage() {
  const { id } = useParams<{ id: string }>()

  const resetLessonStars = useLessonsStore((s) => s.resetLessonStars)
  const lessons = useLessonsStore((s) => s.lessons)
  const selectedAge = useLessonsStore((s) => s.selectedAge)
  const addStar = useLessonsStore((s) => s.addStar)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [modalMode, setModalMode] = useState<ModalType>("none")
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string | null>(null)
  const correctAnswer = useRef([0, 0, 0])
  const lesson = useMemo(
    () => lessons.find((l) => l.id === id),
    [lessons, id]
  )
  const question = lesson?.questions?.[questionIndex]
  const courseColor = useMemo(
    () => AgesList.find((a) => a.age === selectedAge)?.color ?? "gray",
    [selectedAge]
  )

  useEffect(() => {
    resetLessonStars(id)
  }, [resetLessonStars , id])


  function handelSubmit(choeseI: number) {
    if (!lesson || !question) return;

    const isCorrect = choeseI === question.answerIndex
    correctAnswer.current[questionIndex] = isCorrect ? 1 : 0

    if (!isCorrect) {
      setLastCorrectAnswer(question.choices[question.answerIndex])
    } else {
      setLastCorrectAnswer(null)
    }

    setModalMode(isCorrect ? "corect" : "incorect")

    if (questionIndex === lesson.questions.length - 1) {
      const stars = correctAnswer.current.filter((i) => i === 1).length
      addStar(lesson.id, stars)
    }
  }


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
      <AnimatePresence mode="wait">
        {modalMode !== "none" && (
          <Modal
            key={modalMode}
            modalMode={modalMode}
            setModalMode={setModalMode}
            isLast={questionIndex === lesson.questions.length - 1}
            onNext={() => setQuestionIndex((i) => i + 1)}
            correctAnswer={lastCorrectAnswer}
            totalCorrect={correctAnswer.current.filter((i) => i === 1).length}
            totalQuestions={lesson.questions.length}
          />
        )}
      </AnimatePresence>
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

      <div className="flex flex-col justify-between h-full gap-6 overflow-hidden p-1">
        <Steps
          Qn={lesson.questions.length}
          questionIndex={questionIndex}
          courseColor={courseColor}
          setQuestionIndex={setQuestionIndex} />
        <AnimatePresence mode="wait">
          <CourseCard
            key={question.q}
            courseColor={courseColor}
            question={question}
            handelSubmit={handelSubmit}
          />
        </AnimatePresence>
      </div>
    </article>
  )
}