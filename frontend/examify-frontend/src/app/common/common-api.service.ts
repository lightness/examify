import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Exam } from "../common/entity/exam.entity";
import { Topic } from "../common/entity/topic.entity";
import { Question } from "../common/entity/question.entity";
import { ApiService } from "../common/api.service";
import { Permission } from "./entity/permission.enum";


@Injectable()
export class CommonApiService {

    constructor(private apiService: ApiService) { }

    public getAllTopics(): Observable<Topic[]> {
        return this.apiService.get("/topics");
    }

    public getTopic(topicId: number): Observable<Topic> {
        return this.apiService.get(`/topics/${topicId}`);
    }

    public createTopic(topic: Topic): Observable<Topic> {
        return this.apiService.post(`/topics`, topic);
    }

    public updateTopic(topic: Topic): Observable<Topic> {
        return this.apiService.put(`/topics/${topic.id}`, topic);
    }

    public deleteTopic(topicId: number): Observable<void> {
        return this.apiService.delete(`/topics/${topicId}`);
    }

    public getQuestionsByTopic(topicId: number): Observable<Question[]> {
        return this.apiService.get(`/questions`, { topicId });
    }

    public getQuestion(questionId: number): Observable<Question> {
        return this.apiService.get(`/questions/${questionId}`);
    }

    public deleteQuestion(questionId: number): Observable<void> {
        return this.apiService.delete(`/questions/${questionId}`);
    }

    public updateQuestion(question: Question): Observable<Question> {
        return this.apiService.put(`/questions/${question.id}`, question);
    }

    public createQuestion(question: Question): Observable<Question> {
        return this.apiService.post(`/questions`, question);
    }

    public startExamByTopic(topicId: number): Observable<Exam> {
        return this.apiService.get(`/exam/start`, { topicId });
    }

    public checkExam(results: any): Observable<any> {
        return this.apiService.post(`/exam/finish`, results);
    }

    public login(name: string, password: string): Observable<Permission[]> {
        return this.apiService.post("/auth/login", { name, password });
    }

    public getUserStatistics(userId: number, topicId?: number): Observable<UserStatisticsDto> {
        let url = `/dashboard/history/user/${userId}`;

        if (topicId) {
            url += `?topicId=${topicId}`;
        }

        return this.apiService.get(url);
    }

}

export interface UserStatisticsDto {
    exams: Exam[];
}
