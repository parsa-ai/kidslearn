"use client"
import Button from "@/app/components/ui/Button"
import { useLessonsStore } from "@/app/context/useLessonsStore";
import { AgesList } from "@/app/lib/data/AgesList";
import { useState } from "react";


function AgeFilters() {
    const activeAge = useLessonsStore((s) => s.selectedAge)
    const setActiveAge = useLessonsStore((s) => s.setSelectedAge)

    // const [activeAge, setActiveAge] = useState<number>(3);

    return (
        <div>
            <span className="text-xs text-primary-dark">مناسب کودک چند ساله؟</span>
            <ul className="flex flex-row-reverse justify-between items-center gap-3 mt-2">
                {AgesList.map((item) => {
                    const isActive = activeAge === item.age;
                    return (
                        <li key={item.id} className="flex-1">
                            <Button
                                className={`w-full py-1 text-sm`}
                                isActive={isActive ? "active" : "deactive"}
                                onClick={() => setActiveAge(item.age)}
                                color={item.color}
                            >
                                {item.age}
                            </Button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AgeFilters