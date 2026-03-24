import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsForm } from './admin-events-form';

describe('AdminEventsForm', () => {
  let component: AdminEventsForm;
  let fixture: ComponentFixture<AdminEventsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
