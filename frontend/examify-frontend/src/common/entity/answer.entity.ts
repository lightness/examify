import { Question } from "./question.entity";


export interface Answer {
    id?: number;
    text?: string;
    isCorrect?: boolean;
    question?: Question;
    questionId?: number;
}