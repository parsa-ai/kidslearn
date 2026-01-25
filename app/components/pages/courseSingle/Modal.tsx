import { Color, ModalType } from "@/app/lib/Types"
import { useRouter } from "next/router"
import Div from "../../ui/Div"
import Button from "../../ui/Button"
import { ChevronLeft } from "lucide-react"

export default function Modal({
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
  const BaseStyle = "w-dvw h-dvh backdrop-blur-xl absolute inset-0 z-50 flex justify-center items-center cnt"
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
          {modalMode === "done" ? "بازگشت به خانه" : modalMode === "corect" ? "عالی بود، ادامه بده" : "اشکال نداره، ادامه بده"} <ChevronLeft />
        </Button>
      </Div>
    </div>
  )
}
