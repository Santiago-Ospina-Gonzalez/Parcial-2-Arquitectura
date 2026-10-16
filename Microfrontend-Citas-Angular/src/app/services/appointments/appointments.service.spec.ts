import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AppointmentsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('solicita las citas al microservicio', () => {
    service.getAllAppointments(3).subscribe();
    const request = http.expectOne('http://localhost:3003/api/appointments/3');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('consulta una cita por ID', () => {
    service.getAppointmentById(1).subscribe();
    const request = http.expectOne('http://localhost:3003/api/appointments/id/1');
    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('agenda una cita', () => {
    const appointment = { customerName: 'Ana', total: 100, status: 'Pendiente' as const, createdAt: '2026-01-01' };
    service.scheduleAppointment(appointment).subscribe();
    const request = http.expectOne('http://localhost:3003/api/appointments');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(appointment);
    request.flush({ id: 1, ...appointment });
  });
});
