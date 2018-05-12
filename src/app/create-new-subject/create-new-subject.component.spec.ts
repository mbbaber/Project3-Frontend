import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSubjectComponent } from './create-new-subject.component';

describe('CreateNewSubjectComponent', () => {
  let component: CreateNewSubjectComponent;
  let fixture: ComponentFixture<CreateNewSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
