"use client"
import { useLessonsStore } from "@/app/context/useLessonsStore";
import lessonsJson from "@/app/lib/data/lessons.json";

import { useEffect } from "react";
import { useSortingLessons } from "../hooks/useSortingLessons";

export function LessonsInitializer() {
  const setLessons = useLessonsStore((s) => s.setLessons);
  const lessons = useLessonsStore((s) => s.lessons);
  const searchTitle = useLessonsStore((s) => s.searchTitle)
  const selectedAge = useLessonsStore((s) => s.selectedAge)
  const setSorted = useLessonsStore((s) => s.setSorted)

  useEffect(() => {
    setLessons(lessonsJson);
  }, []);
  useEffect(() => {
    const sorted = useSortingLessons(lessons, searchTitle, selectedAge)
    setSorted(sorted)
  }, [searchTitle, selectedAge,lessons]);
  return null;
}