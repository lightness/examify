import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";


@Component({
    selector: "app-form-control-wrapper",
    templateUrl: "./form-control-wrapper.component.html",
    styleUrls: ["./form-control-wrapper.component.scss"]
})
export class FormControlWrapperComponent implements OnInit {

    @Input() private errors: { [name: string]: string };
    @Input() private control: AbstractControl;

    constructor() { }

    public ngOnInit() {
    }

}
