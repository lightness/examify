import { Topic } from "./topic.entity";
import { Answer } from "./answer.entity";


export interface Question {
    id?: number;    
    text?: string;
    topic?: Topic;
    topicId?: number
    answers?: Answer[];
}