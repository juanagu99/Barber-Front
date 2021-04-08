import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingHistoryComponent } from './dating-history.component';

describe('DatingHistoryComponent', () => {
  let component: DatingHistoryComponent;
  let fixture: ComponentFixture<DatingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
