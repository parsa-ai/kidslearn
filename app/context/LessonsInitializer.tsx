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
  const getSorted = useSortingLessons()

  useEffect(() => {
    setLessons(lessonsJson);
  }, [setLessons]);
  useEffect(() => {
    const sorted = getSorted(lessons, searchTitle, selectedAge)
    setSorted(sorted)
  }, [searchTitle, selectedAge, lessons, setSorted, getSorted]);
  return null;
}