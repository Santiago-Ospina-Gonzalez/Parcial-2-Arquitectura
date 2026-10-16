import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Appointment } from '../../interfaces/appointments.interface';
@Component({ selector: 'app-appointments-table', templateUrl: './appointments-table.component.html', imports: [CommonModule] })
export class AppointmentsTableComponent { @Input() appointments: Appointment[] = []; }
