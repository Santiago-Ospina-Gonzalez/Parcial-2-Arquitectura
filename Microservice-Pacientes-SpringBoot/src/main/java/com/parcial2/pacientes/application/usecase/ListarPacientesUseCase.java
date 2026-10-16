package com.parcial2.pacientes.application.usecase;

import com.parcial2.pacientes.domain.model.Paciente;
import com.parcial2.pacientes.domain.repository.PacienteRepository;

import java.util.List;

public class ListarPacientesUseCase {

    private final PacienteRepository repository;

    public ListarPacientesUseCase(PacienteRepository repository) {
        this.repository = repository;
    }

    public List<Paciente> execute() {
        return repository.findAll();
    }
}
