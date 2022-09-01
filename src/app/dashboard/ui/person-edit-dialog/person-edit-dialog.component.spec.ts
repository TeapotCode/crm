import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { provideMock } from '@testing-library/angular/jest-utils';
import { Person } from '../../utils/person.interface';
import { PersonEditDialogComponent } from './person-edit-dialog.component';

describe('PersonEditDialog', () => {
  let component: PersonEditDialogComponent;
  let fixture: ComponentFixture<PersonEditDialogComponent>;
  let dialogRef: MatDialogRef<Person>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEditDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 2,
            age: 10,
            firstname: 'name',
            lastname: 'surname',
          } as Person,
        },
        provideMock(MatDialogRef<Person>),
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        OverlayModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef<Person>);
  });

  describe('Form', () => {
    it('init value of inputs', () => {
      fixture.detectChanges();
      expect(component.firstname.value).toBe('name');
      expect(component.lastname.value).toBe('surname');
      expect(component.age.value).toBe(10);
    });

    it('closes dialog', () => {
      const cancelRef = jest.spyOn(dialogRef, 'close');
      component.onCancel();
      expect(cancelRef).toHaveBeenCalledTimes(1);
    });

    it('closes dialog with value', () => {
      const cancelRef = jest.spyOn(dialogRef, 'close');
      component.onApply();
      expect(cancelRef).toHaveBeenNthCalledWith(1, {
        id: 2,
        age: 10,
        firstname: 'name',
        lastname: 'surname',
      });
    });
  });
});
