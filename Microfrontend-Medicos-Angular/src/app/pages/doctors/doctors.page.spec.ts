import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPage } from './doctors.page';
import { provideHttpClient } from '@angular/common/http';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { DoctorsTableComponent } from '../../components/doctors-table/doctors-table.component';
import { of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../mocks/doctors.mocks';
import { By } from '@angular/platform-browser';

describe('DoctorsPage', () => {
  let component: DoctorsPage;
  let fixture: ComponentFixture<DoctorsPage>;
  let doctorsService: DoctorsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsPage, DoctorsTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsPage);
    component = fixture.componentInstance;
    doctorsService = TestBed.inject(DoctorsService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllDoctors al iniciar', () => {
    const spyGetAllDoctors = jest.spyOn(doctorsService, 'getAllDoctors').mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllDoctors).toHaveBeenCalled();
  });

  it('debería asignar los pacientes recibidos del servicio', () => {
    jest.spyOn(doctorsService, 'getAllDoctors').mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    expect(component.doctors).toEqual(USERS_MOCK);
  });

  it('debería pasar los pacientes al componente doctors-table', () => {
    jest.spyOn(doctorsService, 'getAllDoctors').mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(DoctorsTableComponent))
      .componentInstance;
    expect(tableComponent.doctors).toEqual(USERS_MOCK);
  });

  it('debería manejar el error cuando falla getAllDoctors', () => {
    component.doctors = [];
    const errorResponse = new Error('Error al cargar pacientes');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(doctorsService, 'getAllDoctors').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(doctorsService.getAllDoctors).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.doctors.length).toBe(0);
  });
});
