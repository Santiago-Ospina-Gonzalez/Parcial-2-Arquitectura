package com.parcial2.pacientes.infrastructure.repository;

import com.parcial2.pacientes.domain.model.Paciente;
import com.parcial2.pacientes.domain.repository.PacienteRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryPacienteRepository implements PacienteRepository {

    private final AtomicLong nextId = new AtomicLong(3);
    private final ConcurrentHashMap<Long, Paciente> pacientes = new ConcurrentHashMap<>();

    public InMemoryPacienteRepository() {
        pacientes.put(1L, new Paciente(1L, "Ana Pérez", "1001", "3001001001"));
        pacientes.put(2L, new Paciente(2L, "Carlos Gómez", "1002", "3001001002"));
    }

    @Override
    public List<Paciente> findAll() {
        return new ArrayList<>(pacientes.values());
    }

    @Override
    public Optional<Paciente> findById(Long id) {
        return Optional.ofNullable(pacientes.get(id));
    }

    @Override
    public Paciente save(Paciente paciente) {
        Long id = paciente.id() == null ? nextId.getAndIncrement() : paciente.id();
        Paciente saved = new Paciente(id, paciente.nombre(), paciente.documento(), paciente.telefono());
        pacientes.put(id, saved);
        return saved;
    }
}
