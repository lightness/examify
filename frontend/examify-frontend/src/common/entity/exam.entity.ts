import { User } from "./user.entity";
import { Topic } from "./topic.entity";
import { ExamQuestion } from "./exam-question.entity";


export interface Exam {
    id?: number;
    user?: User;
    userId?: number;
    topic?: Topic;
    topicId?: number;
    examQuestions?: ExamQuestion[];
    startedAt?: Date;
    finishedAt?: Date;
    totalQuestionsAmount?: number;
    answeredQuestionsAmount?: number;
    correctlyAnsweredQuestionsAmount?: number;
}
