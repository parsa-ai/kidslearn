export type Color = "blue" | "orange" | "red" | "green" | "yellow" | "purple" | "gray";
export type IsActive = "active" | "deactive";
export type ModalType = "done" | "incorect" | "corect" | "none";


export type StarsMap = Record<string, number>;

export type LessonsState = {
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
  addStar: (lessonId: string, quantity: number) => void;
  resetLessonStars: (lessonId: string) => void;

};

export interface Colors {
  blue: string,
  orange: string,
  red: string,
  green: string,
  yellow: string,
  purple: string,
  gray: string,
}

export interface ColorsObj {
  active: Colors,
  deactive: Colors,
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  isActive?: IsActive;
}
export type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: Color;
  isActive?: IsActive;
}


export interface IAge {
  id: number,
  age: number,
  color: Color,
}

export type Question = {
  q: string;
  choices: string[];
  answerIndex: number;
};

export type Lesson = {
  id: string;
  title: string;
  ageMin: number;
  ageMax: number;
  icon: string;
  questions: Question[];
};

export interface StepsProps {
  Qn: number;
  questionIndex: number;
  courseColor: Color;
  setQuestionIndex: (a: number) => void;
}