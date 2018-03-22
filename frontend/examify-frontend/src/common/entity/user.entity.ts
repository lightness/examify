import { Exam } from "./exam.entity";
import { Role } from "./role.entity";
import { Question } from "./question.entity";


export interface User {
    id?: number;
    name?: string;
    password?: string;
    roles?: Role[];
    exams?: Exam[];
}
