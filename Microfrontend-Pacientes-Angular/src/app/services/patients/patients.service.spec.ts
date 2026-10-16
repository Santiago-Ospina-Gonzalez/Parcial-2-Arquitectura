import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Patient } from '../../interfaces/patients.interface';
import { PATIENTS_MOCK } from '../../mocks/patients.mocks';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PatientsService);
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

  describe('getAllPatients', () => {
  
    it('debería realizar una petición GET y retornar una lista de pacientes', () => {
      const mockPatients: Patient[] = PATIENTS_MOCK;

      service.getAllPatients().subscribe((pacientes) => {
        expect(pacientes).toEqual(mockPatients);
        expect(pacientes.length).toBe(mockPatients.length);
      });

      const req = httpMock.expectOne('http://localhost:3002/api/pacientes');
      expect(req.request.method).toBe('GET');

      req.flush(mockPatients);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      service.getAllPatients().subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne('http://localhost:3002/api/pacientes');

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

    it('debería consultar un paciente por ID', () => {
      service.getPatientById(1).subscribe();
      const req = httpMock.expectOne('http://localhost:3002/api/pacientes/1');
      expect(req.request.method).toBe('GET');
      req.flush(PATIENTS_MOCK[0]);
    });

    it('debería registrar un paciente', () => {
      const patient = { name: 'Laura', document: '1003', phone: '3001001003' };
      service.registerPatient(patient).subscribe();
      const req = httpMock.expectOne('http://localhost:3002/api/pacientes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(patient);
      req.flush({ id: 3, ...patient });
    });
  
  });

});
