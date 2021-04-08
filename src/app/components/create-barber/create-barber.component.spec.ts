import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBarberComponent } from './create-barber.component';

describe('CreateBarberComponent', () => {
  let component: CreateBarberComponent;
  let fixture: ComponentFixture<CreateBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
