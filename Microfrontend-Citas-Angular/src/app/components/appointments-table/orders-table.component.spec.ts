import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsTableComponent } from './appointments-table.component';

describe('AppointmentsTableComponent', () => {
  let fixture: ComponentFixture<AppointmentsTableComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppointmentsTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppointmentsTableComponent);
  });
  it('crea la tabla y recibe citas', () => {
    fixture.componentInstance.appointments = [{ id: 1, customerName: 'Ana', total: 20, status: 'Pendiente', createdAt: '2026-01-01T00:00:00.000Z' }];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Ana');
  });
});
