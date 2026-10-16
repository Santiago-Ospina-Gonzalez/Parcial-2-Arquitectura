# Parcial 2 - Arquitectura de Software

Solución distribuida de microfrontends Angular con Module Federation y
microservicios independientes. El host integra tres dominios:

```text
HOST
├── Pacientes  → Microservice-Pacientes-SpringBoot
├── Médicos    → Microservice-Medicos-NodeJS
└── Citas      → Microservice-Citas-NodeJS
```

## Requisitos

- Node.js y npm
- Angular CLI 20
- Java 17
- Maven 3.9+

No se requiere una base de datos: los ejemplos usan datos en memoria o Faker,
igual que los repositorios de referencia.

## Puertos y ejecución

Instala las dependencias una vez dentro de cada proyecto:

```powershell
cd Microfrontend-Pacientes-Angular; npm install
cd ..\Microfrontend-Medicos-Angular; npm install
cd ..\Microfrontend-Citas-Angular; npm install
cd ..\Client-Host-Angular; npm install
cd ..\Microservice-Medicos-NodeJS; npm install
cd ..\Microservice-Citas-NodeJS; npm install
```

Inicia cada proceso desde una consola independiente:

| Aplicación | Puerto | Comando |
| --- | ---: | --- |
| Host Angular | 4200 | `npm start` |
| Microfrontend Médicos | 4201 | `npm start` |
| Microfrontend Pacientes | 4202 | `npm start` |
| Microfrontend Citas | 4203 | `npm start` |
| Microservice Médicos | 3001 | `npm start` |
| Microservice Pacientes | 3002 | `mvn spring-boot:run` |
| Microservice Citas | 3003 | `npm start` |

Abre el host en `http://localhost:4200`. Las rutas `/doctors`,
`/patients` y `/appointments` cargan los remotos mediante
`remoteEntry.js`.

## Casos de uso

Cada microfrontend expone tres casos de uso en su capa de aplicación:

- **Pacientes:** listar, consultar por ID y registrar.
- **Médicos:** listar, consultar por ID y registrar.
- **Citas:** listar, consultar por ID y agendar.

Cada microservicio implementa las mismas tres operaciones. Las APIs Node
publican Swagger en `/api/docs`; la API Spring Boot publica OpenAPI en
`http://localhost:3002/api/docs` y la interfaz en
`http://localhost:3002/api/docs-ui`.

## Clean Architecture

Los microfrontends separan presentación, casos de uso, servicios de
infraestructura e interfaces de dominio. Los microservicios Node separan
dominio, aplicación (`src/application/usecases`), presentación y
configuración; cada operación de negocio tiene su propio caso de uso. El
microservicio Spring separa
dominio, aplicación, infraestructura y presentación.

El host no contiene lógica de negocio: únicamente configura navegación y
carga remotos. Cada frontend consume exclusivamente el microservicio de su
dominio.

## Pruebas y cobertura

Ejecuta en cada microfrontend:

```powershell
npm test
npm run test:coverage
```

La cobertura se genera en `coverage/`. Para compilar:

```powershell
npm run build
```

Para validar el microservicio Spring Boot:

```powershell
mvn test
```

## Documentación por aplicación

- [Host Angular](./Client-Host-Angular/README.md)
- [Microfrontend de pacientes](./Microfrontend-Pacientes-Angular/README.md)
- [Microfrontend de médicos](./Microfrontend-Medicos-Angular/README.md)
- [Microfrontend de citas](./Microfrontend-Citas-Angular/README.md)
- [Microservice de pacientes](./Microservice-Pacientes-SpringBoot/README.md)
- [Microservice de médicos](./Microservice-Medicos-NodeJS/README.md)
- [Microservice de citas](./Microservice-Citas-NodeJS/README.md)
