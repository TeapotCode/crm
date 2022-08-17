import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {Person} from "../../utils/person.interface";
import {FormBuilder, FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-person-edit-dialog',
  templateUrl: './person-edit-dialog.component.html',
  styleUrls: ['./person-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonEditDialogComponent {
    firstname = new FormControl(this.data.firstname, {nonNullable: true})
    lastname = new FormControl(this.data.lastname, {nonNullable: true})
    age = new FormControl(this.data.age, {nonNullable: true})

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Person, public dialogRef: MatDialogRef<Person>) {
  }

  onCancel() {
    this.dialogRef.close()
  }

  onApply() {
    this.dialogRef.close(
      {
        ...this.data,
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        age: this.age.value
      })
  }
}
