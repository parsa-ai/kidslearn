"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import Button from "@/app/components/ui/Button"
import Div from "@/app/components/ui/Div"
import { useLessonsStore } from "@/app/context/useLessonsStore"
import { AgesList } from "@/app/lib/data/AgesList"
import { Color } from "@/app/lib/Types"

type ModalType = "done" | "incorect" | "corect" | "none"

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
  }, [])

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

  return (
    <article className="cnt py-6 h-full flex flex-col gap-5">
      {modalMode !== "none" && (
        <Modal
          modalMode={modalMode}
          setModalMode={setModalMode}
          isLast={questionIndex === lesson.questions.length - 1}
          onNext={() => setQuestionIndex((i) => i + 1)}
          correctAnswer={lastCorrectAnswer}
          totalCorrect={correctAnswer.current.filter((i) => i === 1).length}
          totalQuestions={lesson.questions.length}
        />
      )}

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
                  onClick={() => handelSubmit(i)}
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
          className="w-full h-[0.5px] relative -z-20"
          color={isActive ? color : "gray"}
          isActive="active"
        />
      )}
      <Button
        onClick={onClick}
        color={isActive ? color : "gray"}
        isActive={isActive ? "active" : "deactive"}
        className={`min-w-12 h-6 text-sm  ${isActive ? "border" : "bg-white"}`}
      >
        {index + 1}
      </Button>

    </>
  )
}

function Modal({
  modalMode,
  setModalMode,
  isLast,
  onNext,
  correctAnswer,
  totalCorrect,
  totalQuestions,
}: {
  modalMode: ModalType
  setModalMode: (mode: ModalType) => void
  isLast: boolean
  onNext: () => void
  correctAnswer: string | null
  totalCorrect: number
  totalQuestions: number
}) {
  const router = useRouter()

  const BaseStyle =
    "w-dvw h-dvh backdrop-blur-xl absolute inset-0 z-50 flex justify-center items-center cnt"

  const ModeStyle: Record<
    ModalType,
    { bg: string; color: Color | undefined; title: string }
  > = {
    none: { bg: "", color: undefined, title: "" },
    corect: {
      bg: "bg-green-500/20",
      color: "green",
      title: "درست جواب دادی :)",
    },
    incorect: {
      bg: "bg-red-500/20",
      color: "red",
      title: "غلط بود :(",
    },
    done: {
      bg: "bg-yellow-500/20",
      color: "yellow",
      title: "تموووم شد 🦦",
    },
  }

  function handleClose() {
    if (modalMode === "corect" || modalMode === "incorect") {
      if (isLast) {
        setModalMode("done")
      } else {
        setModalMode("none")
        onNext()
      }
      return
    }

    if (modalMode === "done") {
      router.push("/")
    }
  }

  return (
    <div className={`${BaseStyle} ${ModeStyle[modalMode].bg}`}>
      <Div
        className="w-full max-w-md rounded-3xl! cnt py-6 px-4 flex flex-col gap-4 items-center "
        color={ModeStyle[modalMode].color}
        isActive="active"
      >
        <h2 className="font-bold">
          {ModeStyle[modalMode].title}
        </h2>

        {modalMode === "incorect" && correctAnswer && (
          <p className="text-xl">
            جواب درست
            {" "}<span className="font-bold underline">
              {correctAnswer} 
            </span> {" "}
         بود
          </p>
        )}

        {modalMode === "done" && (
          <p className="text-2xl font-bold text-center">
            {totalCorrect}  از {totalQuestions} تا سوال رو درست جواب دادی 👏
          </p>
        )}

        <Button
          color={ModeStyle[modalMode].color}
          isActive="active"
          onClick={handleClose}
          className="flex underline text-xl items-center"
          
        >
          {modalMode === "done" ? "بازگشت به خانه" : modalMode ==="corect" ? "عالی بود، ادامه بده" : "اشکال نداره، ادامه بده"} <ChevronLeft/>
        </Button>
      </Div>
    </div>
  )
}
