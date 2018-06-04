import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CargarArchivoComponent } from './cargar-archivo/cargar-archivo.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/upload',
    component: CargarArchivoComponent
  },
  {
    path: 'admin/download',
    component: ReporteComponent
  }

];

@NgModule({ 
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
