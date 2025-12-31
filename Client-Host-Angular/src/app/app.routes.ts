import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: './UsersComponent',
        }).then(m => m.UsersComponent),
    },   
    {
        path: 'products',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './ProductsComponent',
        }).then(m => m.ProductsComponent),
    },   
];