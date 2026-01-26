"use client"
import Button from "@/app/components/ui/Button"
import Div from "@/app/components/ui/Div"
import { Color, Question } from "@/app/lib/Types"
import {  motion } from "motion/react"
export default function CourseCard({ courseColor, question, handelSubmit }: { courseColor: Color, question: Question, handelSubmit: (choeseI: number) => void }) {
    return (
        <motion.div initial={{ x: "150%" }} animate={{ x: 0 }} exit={{ x: "-150%" }} className="flex-1 h-full">
            <Div
                color={courseColor}
                className="rounded-3xl! flex flex-col h-full justify-between px-4 py-6 flex-1 overflow-hidden "
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
        </motion.div>
    )
}