package com.parcial2.pacientes.application.usecase;

import com.parcial2.pacientes.domain.model.Paciente;
import com.parcial2.pacientes.domain.repository.PacienteRepository;

public class ConsultarPacientePorIdUseCase {

    private final PacienteRepository repository;

    public ConsultarPacientePorIdUseCase(PacienteRepository repository) {
        this.repository = repository;
    }

    public Paciente execute(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado: " + id));
    }
}
