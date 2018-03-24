import { User } from "./user.entity";
import { Exam } from "./exam.entity";
import { Answer } from "./answer.entity";
import { Question } from "./question.entity";


export interface ExamQuestion {
    id?: number;
    exam?: Exam;
    question?: Question;
    answers?: Answer[];
}
