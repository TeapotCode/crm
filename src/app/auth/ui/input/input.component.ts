import {Component, Input, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {

  @Input() type: 'text' | 'password' | 'email' = 'text'

  value: string = "";
  disabled = false;

  onChange = (value: string) => {}
  onTouched = () => {}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(valueReceived: string): void {
    this.value = valueReceived
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }


  constructor(@Self() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this
  }
}

