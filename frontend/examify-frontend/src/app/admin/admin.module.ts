import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { routing } from './admin.routing';
import { AdminService } from './admin.service';
import { AdminComponent } from './admin.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ManageTopicsComponent } from './manage-topics/manage-topics.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        AdminComponent,
        ManageTopicsComponent,
        EditTopicComponent,
        EditQuestionComponent
    ],
    providers: [AdminService]
})
export class AdminModule { }
