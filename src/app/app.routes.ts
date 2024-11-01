import { Routes } from '@angular/router';
import { AddTrainingComponent } from './features/pages/add-training/add-training.component';
import { HomeComponent } from './features/pages/home/home.component';
import { PrincipalComponent } from './features/pages/principal/principal.component';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'auth/login' },

  { path: 'admin', component: PrincipalComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },


  {path: 'admin',
    component: PrincipalComponent,
    children: [
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path: 'add-training',
        component:AddTrainingComponent
    },

  ]},
];
