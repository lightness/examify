// export interface ExamData {
//     id: number;
//     examQuestions: {
//         question: { id: number },
//         answers: { id: number }[]
//     }[];
// }

export interface ExamResult {
    totalQuestionsAmount: number;
    answeredQuestionsAmount: number;
    correctlyAnsweredQuestionsAmount: number;
}
