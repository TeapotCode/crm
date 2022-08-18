import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Person } from '../../utils/person.interface';
import { PersonEditDialogComponent } from '../../ui/person-edit-dialog/person-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  personList: Person[] = [
    { firstname: 'name4', lastname: 'last4', age: 40, id: 1 },
    { firstname: 'name3', lastname: 'last3', age: 30, id: 2 },
    { firstname: 'name5', lastname: 'last5', age: 50, id: 3 },
    { firstname: 'name2', lastname: 'last2', age: 20, id: 4 },
    { firstname: 'name1', lastname: 'last1', age: 10, id: 5 },
  ];

  constructor(
    private dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.queryParamMap.get('userId'));
    let person = this.personList.find((person) => {
      return person.id === id;
    });
    if (person) this.onEdit(person);
  }

  toPerson(value: any) {
    return value as Person;
  }

  onEdit(edit_person: Person) {
    this.router.navigate([], {
      queryParams: { userId: edit_person.id },
      queryParamsHandling: 'merge',
    });

    let dialogRef = this.dialog.open(PersonEditDialogComponent, {
      data: edit_person,
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value)
        this.personList = this.personList.map((person) =>
          person.id === edit_person.id ? value : person
        );

      this.router.navigate([], {
        queryParams: { userId: null },
        queryParamsHandling: 'merge',
      });

      this.changeRef.markForCheck();
    });
  }
}
