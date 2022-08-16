import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.changeRef.detectChanges()
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
    this.changeRef.detectChanges()
  }


  constructor(private changeRef: ChangeDetectorRef) {
  }
}

