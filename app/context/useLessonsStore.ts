import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LessonsState } from "../lib/Types";

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

      addStar: (lessonId, quantity) =>
        set((state) => ({
          stars: {
            ...state.stars,
            [lessonId]: quantity,
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
