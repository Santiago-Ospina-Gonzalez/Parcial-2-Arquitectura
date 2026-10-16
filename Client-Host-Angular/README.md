# Host Angular

Host del sistema en `http://localhost:4200`. Su responsabilidad es mostrar el
navbar y cargar los tres remotos con Module Federation:

- Médicos: `http://localhost:4201/remoteEntry.js`
- Pacientes: `http://localhost:4202/remoteEntry.js`
- Citas: `http://localhost:4203/remoteEntry.js`

```powershell
npm install
npm start
```
