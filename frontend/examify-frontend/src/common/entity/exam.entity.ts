import { User } from "./user.entity";
import { ExamQuestion } from "./exam-question.entity";


export interface Exam {
    id?: number;
    user?: User;
    examQuestions?: ExamQuestion[];
    startedAt?: Date;
    finishedAt?: Date;
    totalQuestionsAmount?: number;
    answeredQuestionsAmount?: number;
    correctlyAnsweredQuestionsAmount?: number;
}
