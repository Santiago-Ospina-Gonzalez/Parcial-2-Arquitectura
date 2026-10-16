# Microservice de Citas

Servicio Node.js en `http://localhost:3003`, organizado en dominio,
aplicación (`src/application/usecases`), presentación y configuración.
Los casos de listar, consultar por ID y agendar están implementados como
clases independientes.

```powershell
npm install
npm start
```

Endpoints: `GET /api/appointments/10`, `GET /api/appointments/id/1` y
`POST /api/appointments`. Swagger: `http://localhost:3003/api/docs`.
