const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = withModuleFederationPlugin({
  name: 'mf-appointments',
  filename: 'remoteEntry.js',
  exposes: { './AppointmentsPage': './src/app/pages/appointments/appointments.page.ts' },
  shared: { ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }) },
});
