import { OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

export abstract class BaseFormComponent implements OnInit {

    protected formModel: { [name: string]: AbstractControl };
    protected formGroup: FormGroup;
    protected errors: { [name: string]: string };

    constructor() {
        this.errors = this.createErrors();
    }

    public ngOnInit() {
    }

    protected abstract createFormControls(): { [key: string]: AbstractControl };
    protected abstract createErrors();

}
