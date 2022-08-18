import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../utils/person.interface';

@Component({
  selector: 'app-person-edit-dialog',
  templateUrl: './person-edit-dialog.component.html',
  styleUrls: ['./person-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonEditDialogComponent {
  firstname = new FormControl(this.data.firstname, { nonNullable: true });
  lastname = new FormControl(this.data.lastname, { nonNullable: true });
  age = new FormControl(this.data.age, { nonNullable: true });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public dialogRef: MatDialogRef<Person>
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onApply() {
    this.dialogRef.close({
      ...this.data,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      age: this.age.value,
    });
  }
}
