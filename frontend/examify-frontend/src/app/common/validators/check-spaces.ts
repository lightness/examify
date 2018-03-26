import { AbstractControl, ValidatorFn } from "@angular/forms";


export function checkSpaces(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const isValid = controlValue !== "" ? new RegExp("^[^\\s]+$").test(controlValue) : true;
        return isValid ? null : { hasSpaces: true };
    };
}
