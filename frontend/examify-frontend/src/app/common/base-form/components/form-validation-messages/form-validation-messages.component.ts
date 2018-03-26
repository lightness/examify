import * as _ from "lodash";
import { Input, OnInit, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
    selector: "app-form-validation-messages",
    templateUrl: "./form-validation-messages.component.html",
    styleUrls: ["./form-validation-messages.component.scss"]
})
export class FormValidationMessagesComponent implements OnInit {

    @Input() private control: FormControl | FormGroup;
    @Input() private errors: { [name: string]: string };

    private preparedMessages: string;

    constructor() { }

    public ngOnInit() {

        this.renderPreparedMessages();

        if (this.control instanceof FormControl) {
            this.control.statusChanges
                .subscribe(() => {
                    this.renderPreparedMessages();
                });
        }
    }

    private renderPreparedMessages() {
        const preparedMessagesTpl = this.getErrors();
        const context = this.createContext();
        this.preparedMessages = _.map(preparedMessagesTpl, (tpl) => _.template(tpl)(context));
    }

    private createContext() {
        let res = {};
        _.forEach(_.keys(this.control.errors), v => {
            res = {
                ...res,
                ...this.control.errors[v]
            };
        });

        return res;
    }

    private getErrors() {
        return _.filter(this.errors, (err, key) => this.control.hasError(key));
    }

}
