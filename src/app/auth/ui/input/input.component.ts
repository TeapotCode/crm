import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {

  @Input() type: 'text' | 'password' = 'text'

  value: string = "";
  disabled = false;

  onChange = (value: string) => {
  }
  onTouched = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(valueRecived: string): void {
    this.value = valueRecived
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  constructor() {
  }
}

