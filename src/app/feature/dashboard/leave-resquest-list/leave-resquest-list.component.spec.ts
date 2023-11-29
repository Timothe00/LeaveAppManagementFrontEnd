import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveResquestListComponent } from './leave-resquest-list.component';

describe('LeaveResquestListComponent', () => {
  let component: LeaveResquestListComponent;
  let fixture: ComponentFixture<LeaveResquestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveResquestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveResquestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
