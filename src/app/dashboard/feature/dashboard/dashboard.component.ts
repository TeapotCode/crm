import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Person} from "../../utils/person.interface";
import {PersonEditDialogComponent} from "../../ui/person-edit-dialog/person-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  personList: Person[] = [
    {firstname: 'name1', lastname: 'last1', age: 10, id: Symbol()},
    {firstname: 'name2', lastname: 'last2', age: 20, id: Symbol()},
    {firstname: 'name3', lastname: 'last3', age: 30, id: Symbol()},
    {firstname: 'name4', lastname: 'last4', age: 40, id: Symbol()},
    {firstname: 'name5', lastname: 'last5', age: 50, id: Symbol()},
  ]

  constructor(private dialog: MatDialog, private changeRef: ChangeDetectorRef) {
  }

  toPerson(value: any) {
    return value as Person
  }

  onEdit(person: Person) {
    let dialogRef = this.dialog.open(PersonEditDialogComponent, {data: person})
    dialogRef.afterClosed().subscribe(value => {
      if (this.toPerson(value))
        this.personList = this.personList.map(person => person.id === value.id ? value : person)

      this.changeRef.markForCheck()
    })


  }

}
