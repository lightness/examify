import { Injectable } from "@angular/core";



@Injectable()
export class RoutingService {

    public getLoginPage() {
        return ["/login"];
    }

    public getTopicAddPage() {
        return ["/admin", "content-management", "topic", "new"];
    }

    public getTopicsManagePage() {
        return ["/admin", "content-management", "topics"];
    }

    public getTopicEditPage(topicId: number) {
        return ["/admin", "content-management", "topic", topicId];
    }

    public getQuestionsManagePage(topicId: number) {
        return ["/admin", "content-management", "topic", topicId, "questions"];
    }

    public getQuestionAddPage(topicId: number) {
        return ["/admin", "content-management", "topic", topicId, "question", "new"];
    }

    public getQuestionEditPage(topicId: number, questionId: number) {
        return ["/admin", "content-management", "topic", topicId, "question", questionId];
    }

    public getUsersManagePage() {
        return ["/admin", "stuff-management", "users"];
    }

    public getUserAddPage() {
        return ["/admin", "stuff-management", "user", "new"];
    }

    public getUserEditPage(userId: number) {
        return ["/admin", "stuff-management", "user", userId];
    }

    public getStatisticsRootPage() {
        return ["/dashboard", "statistics"];
    }

    public getUserStatisticsPage(userId: number) {
        return ["/dashboard", "statistics", "user", userId];
    }

    public getExamSelectPage() {
        return ["/"];
    }

    public getTheoryPage(topicId: number) {
        return ["/topic", topicId, "theory"];
    }

    public getExamPage(topicId: number) {
        return ["/topic", topicId, "exam"];
    }

}
