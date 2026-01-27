import { Lesson } from "../lib/Types"

export function useSortingLessons(): ((lessons: Lesson[], searchTitle: string, selectedAge: number) => Lesson[]) {
    return (lessons: Lesson[], searchTitle: string, selectedAge: number) => {
        return lessons.filter((lesson) => {
            const matchTitle = lesson.title
                .toLowerCase()
                .includes(searchTitle.toLowerCase())

            const matchAge = (selectedAge >= lesson.ageMin && selectedAge <= lesson.ageMax) || selectedAge == 0

            return matchTitle && matchAge
        })
    }
}
