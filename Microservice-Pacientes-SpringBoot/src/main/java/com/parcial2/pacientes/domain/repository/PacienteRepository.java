package com.parcial2.pacientes.domain.repository;

import com.parcial2.pacientes.domain.model.Paciente;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository {

    List<Paciente> findAll();

    Optional<Paciente> findById(Long id);

    Paciente save(Paciente paciente);
}
