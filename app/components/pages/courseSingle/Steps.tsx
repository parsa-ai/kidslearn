import { Color, StepsProps } from "@/app/lib/Types"
import Div from "../../ui/Div"
import Button from "../../ui/Button"

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


export default function Steps({ Qn, questionIndex, courseColor, setQuestionIndex }: StepsProps) {
    return (
        <div className="flex items-center">
            {Array.from({ length: Qn }, (_, i) => (
                <Step
                    key={i}
                    index={i}
                    activeIndex={questionIndex}
                    color={courseColor}
                    onClick={() => setQuestionIndex(i)}
                />
            ))}
        </div>
    )
}
