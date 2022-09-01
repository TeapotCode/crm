import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
} from '@angular/router';
import {
  provideMock,
  provideMockWithValues,
} from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
import { PersonEditDialogComponent } from '../../ui/person-edit-dialog/person-edit-dialog.component';
import { Person } from '../../utils/person.interface';
import { DashboardComponent } from './dashboard.component';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let person: Person;
  let dialog: MatDialog;
  let router: Router;
  let activatedRoute: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        provideMock(MatDialog),
        provideMockWithValues(ActivatedRouteSnapshot, {
          queryParamMap: convertToParamMap({ userId: 0 }),
        }),
        provideMock(Router),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    person = { id: 2, firstname: 'name', lastname: 'surname', age: 10 };
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRouteSnapshot);
  });

  describe('Dialog', () => {
    it('should open dialog', () => {
      const dialogSpy = jest
        .spyOn(dialog, 'open')
        .mockReturnValue({ afterClosed: () => of(person) } as MatDialogRef<
          typeof component
        >);

      component.onEdit(person);

      expect(dialogSpy).toHaveBeenNthCalledWith(1, PersonEditDialogComponent, {
        data: person,
      });
    });

    it('should add navigate and clear after', () => {
      jest
        .spyOn(dialog, 'open')
        .mockReturnValue({ afterClosed: () => of(person) } as MatDialogRef<
          typeof component
        >);

      const routerSpy = jest.spyOn(router, 'navigate');
      component.onEdit(person);

      expect(routerSpy).toHaveBeenCalledTimes(2);
    });

    it('should set new value for person', () => {
      component.personList = [
        { id: 2, firstname: 'name', lastname: 'test', age: 10 },
      ];

      fixture.detectChanges();
      jest
        .spyOn(dialog, 'open')
        .mockReturnValue({ afterClosed: () => of(person) } as MatDialogRef<
          typeof component
        >);

      component.onEdit(person);

      expect(component.personList).toEqual([person]);
    });

    it('should open dialog if query', () => {
      const personUniq: Person = {
        id: 0,
        firstname: 'name',
        lastname: 'test',
        age: 10,
      };
      component.personList = [personUniq];

      jest
        .spyOn(dialog, 'open')
        .mockReturnValue({ afterClosed: () => of(person) } as MatDialogRef<
          typeof component
        >);

      const navigationSpy = jest.spyOn(router, 'navigate');
      const onEditSpy = jest.spyOn(component, 'onEdit');

      fixture.detectChanges();

      expect(onEditSpy).toHaveBeenCalledWith(personUniq);
      expect(navigationSpy).toHaveBeenCalledTimes(2);
    });
  });
});
