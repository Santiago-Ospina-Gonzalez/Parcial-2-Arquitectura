package com.parcial2.pacientes.application.usecase;

import com.parcial2.pacientes.domain.model.Paciente;
import com.parcial2.pacientes.domain.repository.PacienteRepository;

public class RegistrarPacienteUseCase {

    private final PacienteRepository repository;

    public RegistrarPacienteUseCase(PacienteRepository repository) {
        this.repository = repository;
    }

    public Paciente execute(Paciente paciente) {
        if (paciente.nombre() == null || paciente.nombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del paciente es obligatorio");
        }
        return repository.save(paciente);
    }
}
