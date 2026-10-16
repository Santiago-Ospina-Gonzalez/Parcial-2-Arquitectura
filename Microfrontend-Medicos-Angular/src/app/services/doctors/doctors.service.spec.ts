import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Doctor } from '../../interfaces/doctors.interface';
import { USERS_MOCK } from '../../mocks/doctors.mocks';
import { DoctorsService } from './doctors.service';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(DoctorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {

    it('debería crearse correctamente', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('getAllDoctors', () => {

    it('debería realizar una petición GET y retornar una lista de médicos', () => {
      const countDoctors = 5;
      const mockDoctors: Doctor[] = USERS_MOCK;

      service.getAllDoctors(countDoctors).subscribe((médicos) => {
        expect(médicos).toEqual(mockDoctors);
        expect(médicos.length).toBe(mockDoctors.length);
      });

      const req = httpMock.expectOne(`http://localhost:3001/api/doctors/${countDoctors}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockDoctors);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countDoctors = 3;

      service.getAllDoctors(countDoctors).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`http://localhost:3001/api/doctors/${countDoctors}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

    it('debería consultar un médico por ID', () => {
      service.getDoctorById(1).subscribe();
      const req = httpMock.expectOne('http://localhost:3001/api/doctors/id/1');
      expect(req.request.method).toBe('GET');
      req.flush(USERS_MOCK[0]);
    });

    it('debería registrar un médico', () => {
      const doctor = { name: 'Ana', lastName: 'Pérez', age: 35, email: 'ana@example.com', engineering: 'Sistemas' as const };
      service.registerDoctor(doctor).subscribe();
      const req = httpMock.expectOne('http://localhost:3001/api/doctors');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(doctor);
      req.flush({ id: 3, ...doctor });
    });

  });

});
