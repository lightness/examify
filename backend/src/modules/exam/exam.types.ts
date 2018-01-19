export type ExamData = { questionId: number, answerIds: number[] }[];

export interface ExamResult {
    totalQuestionsCount: number;
    answeredQuestionsCount: number;
    correctlyAnsweredQuestionsCount: number;
}