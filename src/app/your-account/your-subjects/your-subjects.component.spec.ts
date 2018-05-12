import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSubjectsComponent } from './your-subjects.component';

describe('YourSubjectsComponent', () => {
  let component: YourSubjectsComponent;
  let fixture: ComponentFixture<YourSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
