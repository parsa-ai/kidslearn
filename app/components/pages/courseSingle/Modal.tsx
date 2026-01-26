"use client"
import { Color, ModalType } from "@/app/lib/Types"
import Div from "../../ui/Div"
import Button from "../../ui/Button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import StarIcon from "../../icons/StarIcon"
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
      title: "",
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
  let quantity = totalCorrect
  if (!quantity) {
    quantity = 0
  }
  if (quantity > 3) {
    quantity = 3
  }
  let quantityDeactive = 3 - quantity
  if (quantityDeactive < 0) {
    quantityDeactive = 0
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${BaseStyle} ${ModeStyle[modalMode].bg}`}>
      <Div
        className="w-full max-w-md rounded-3xl! cnt py-6 px-4 flex flex-col gap-4 items-center "
        color={ModeStyle[modalMode].color}
        isActive="active"
      >
        <h2 className="font-bold">
          {ModeStyle[modalMode].title}
        </h2>
        {modalMode === "done" && (
          <div className="flex flex-row-reverse gap-4 w-full justify-center rounded-full">
            {Array.from({ length: totalQuestions }, (v, i) => {
              if (i < totalCorrect) {
                return (
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    transition={{ delay: i * 0.3 }}
                    animate={{ scale: 1, opacity: 1 }} key={i}
                    className="flex justify-center items-center border-2 border-yellow-600 bg-yellow-100/80 rounded-[20px] p-2"
                  >
                    <StarIcon className="w-10 h-10 fill-yellow-500 stroke stroke-yellow-700 " />
                    <StarIcon className="w-10 h-10 fill-yellow-500 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] absolute  opacity-40" />
                    <StarIcon className="w-10 h-10 fill-yellow-500 absolute opacity-80 blur-xs" />
                  </motion.div>
                )
              }
              return (
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  transition={{ delay: i * 0.3 }}
                  animate={{ scale: 1, opacity: 1 }} key={i}
                  className="flex justify-center items-center border-2  border-white/40  rounded-[20px] p-2"
                >
                  <StarIcon className="w-10 h-10 fill-white/40 " />
                </motion.div>
              )
            })}
          </div >)}


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
          <>
            <p className="text-2xl font-bold text-center">
              {totalCorrect}  از {totalQuestions} تا سوال رو درست جواب دادی 👏
            </p>
          </>
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
    </motion.div>
  )
}
