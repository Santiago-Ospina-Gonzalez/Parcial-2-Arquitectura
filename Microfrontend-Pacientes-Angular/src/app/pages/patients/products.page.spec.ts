import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsPage } from './patients.page';
import { provideHttpClient } from '@angular/common/http';
import { PatientsService } from '../../services/patients/patients.service';
import { PatientsTableComponent } from '../../components/patients-table/patients-table.component';
import { of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../mocks/patients.mocks';
import { By } from '@angular/platform-browser';

describe('PatientsPage', () => {
  let component: PatientsPage;
  let fixture: ComponentFixture<PatientsPage>;
  let patientsService: PatientsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsPage, PatientsTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsPage);
    component = fixture.componentInstance;
    patientsService = TestBed.inject(PatientsService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllPatients al iniciar', () => {
    const spyGetAllPatients = jest.spyOn(patientsService, 'getAllPatients').mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllPatients).toHaveBeenCalled();
  });

  it('debería asignar los patientos recibidos del servicio', () => {
    jest.spyOn(patientsService, 'getAllPatients').mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    expect(component.patients).toEqual(PRODUCTS_MOCK);
  });

  it('debería pasar los patientos al componente patients-table', () => {
    jest.spyOn(patientsService, 'getAllPatients').mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(PatientsTableComponent))
      .componentInstance;
    expect(tableComponent.patients).toEqual(PRODUCTS_MOCK);
  });

  it('debería manejar el error cuando falla getAllPatients', () => {
    component.patients = [];
    const errorResponse = new Error('Error al cargar patientos');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(patientsService, 'getAllPatients').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(patientsService.getAllPatients).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.patients.length).toBe(0);
  });
});
