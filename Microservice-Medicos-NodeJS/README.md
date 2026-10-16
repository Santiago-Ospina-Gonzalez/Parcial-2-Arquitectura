# Microservice de Médicos

Servicio Node.js en `http://localhost:3001`, organizado en dominio,
aplicación (`src/application/usecases`), presentación y configuración.
Los casos de listar, consultar por ID y registrar están implementados como
clases independientes.

```powershell
npm install
npm start
```

Endpoints: `GET /api/doctors/10`, `GET /api/doctors/id/1` y
`POST /api/doctors`. Swagger: `http://localhost:3001/api/docs`.
