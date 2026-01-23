import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Lesson } from "../lib/Types";
type StarsMap = Record<string, number>;

type LessonsState = {
  lessons: Lesson[];
  sorted: Lesson[];

  searchTitle: string;
  selectedAge: number;

  stars: StarsMap;

  setLessons: (lessons: Lesson[]) => void;
  setSorted: (lessons: Lesson[]) => void;

  setSearchTitle: (value: string) => void;
  setSelectedAge: (age: number) => void;

  getLessonStars: (lessonId: string) => number;
  addStar: (lessonId: string) => void;
  resetLessonStars: (lessonId: string) => void;

};

export const useLessonsStore = create<LessonsState>()(
  persist(
    (set, get) => ({
      lessons: [],
      sorted: [],

      searchTitle: "",
      selectedAge: 0, 

      stars: {},

      setLessons: (lessons) => set({ lessons }),
      setSorted: (sorted) => set({ sorted }),

      setSearchTitle: (value) => set({ searchTitle: value }),
      setSelectedAge: (age) => set({ selectedAge: age }),

      getLessonStars: (lessonId) => {
        return get().stars[lessonId] ?? 0;
      },

      addStar: (lessonId) =>
        set((state) => ({
          stars: {
            ...state.stars,
            [lessonId]: (state.stars[lessonId] ?? 0) + 1,
          },
        })),

      resetLessonStars: (lessonId) =>
        set((state) => {
          const newStars = { ...state.stars };
          newStars[lessonId] = 0;
          return { stars: newStars };
        }),


    }),
    {
      name: "kidslearn-stars", 
      partialize: (state) => ({
        stars: state.stars,
      }),
    }
  )
);
