export type Color = "blue" | "orange" | "red" | "green" | "yellow" | "purple";
export type IsActive = "active" | "deactive";

export interface Colors {
    blue: string,
    orange: string,
    red: string,
    green: string,
    yellow: string,
    purple: string,
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
