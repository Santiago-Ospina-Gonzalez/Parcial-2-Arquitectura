import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PRODUCTS_MOCK } from '../../mocks/patients.mocks';
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

  it('debería renderizar una fila por cada patiento', () => {
    component.patients = PRODUCTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.patients.length);
  });

  it('debería mostrar los datos del patiento en cada columna', () => {
    component.patients = PRODUCTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const patient = component.patients[index];
      const patientPrice = new CurrencyPipe('en-US').transform(patient.price);

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(patient.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(patient.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(patientPrice);
      expect(columns[3].nativeElement.textContent.trim()).toBe(patient.category);
    });
  });

  it('debería mapear cada ingeniería a su BadgeType correcto', () => {
    expect(component.categoryMap['Carnes']).toBe('danger');
    expect(component.categoryMap['Frutas']).toBe('warning');
    expect(component.categoryMap['Lacteos']).toBe('primary');
    expect(component.categoryMap['Verduras']).toBe('success');
  });
});
