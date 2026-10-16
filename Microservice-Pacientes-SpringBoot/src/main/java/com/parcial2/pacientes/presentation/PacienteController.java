package com.parcial2.pacientes.presentation;

import com.parcial2.pacientes.application.usecase.ConsultarPacientePorIdUseCase;
import com.parcial2.pacientes.application.usecase.ListarPacientesUseCase;
import com.parcial2.pacientes.application.usecase.RegistrarPacienteUseCase;
import com.parcial2.pacientes.domain.model.Paciente;
import com.parcial2.pacientes.domain.repository.PacienteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin
@Tag(name = "Pacientes")
public class PacienteController {

    private final ListarPacientesUseCase listar;
    private final ConsultarPacientePorIdUseCase consultar;
    private final RegistrarPacienteUseCase registrar;

    public PacienteController(PacienteRepository repository) {
        this.listar = new ListarPacientesUseCase(repository);
        this.consultar = new ConsultarPacientePorIdUseCase(repository);
        this.registrar = new RegistrarPacienteUseCase(repository);
    }

    @GetMapping
    @Operation(summary = "Listar pacientes")
    public List<Paciente> listar() {
        return listar.execute();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar paciente por ID")
    public Paciente consultar(@PathVariable Long id) {
        try {
            return consultar.execute(id);
        } catch (IllegalArgumentException error) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, error.getMessage(), error);
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar paciente")
    public Paciente registrar(@RequestBody Paciente paciente) {
        try {
            return registrar.execute(paciente);
        } catch (IllegalArgumentException error) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, error.getMessage(), error);
        }
    }
}
