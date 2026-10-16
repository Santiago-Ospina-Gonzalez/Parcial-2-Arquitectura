import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PATIENTS_MOCK } from '../../mocks/patients.mocks';
import { PatientsTableComponent } from './patients-table.component';

describe('PatientsTableComponent', () => {
  let component: PatientsTableComponent;
  let fixture: ComponentFixture<PatientsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada paciente', () => {
    component.patients = PATIENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.patients.length);
  });

  it('debería mostrar los datos del paciente en cada columna', () => {
    component.patients = PATIENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const patient = component.patients[index];
      expect(columns[0].nativeElement.textContent.trim()).toBe(String(patient.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(patient.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(patient.document);
      expect(columns[3].nativeElement.textContent.trim()).toBe(patient.phone);
    });
  });
});
