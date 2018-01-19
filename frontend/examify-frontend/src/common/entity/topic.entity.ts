import { Question } from "./question.entity";


export interface Topic {
    id?: number;
    title?: string;
    theory?: string;
    questions?: Question[];
}
