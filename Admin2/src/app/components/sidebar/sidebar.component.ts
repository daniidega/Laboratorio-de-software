import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Perfil de Usuario',  icon:'person', class: '' },
    { path: '/admin/upload', title: 'Cargar Documento',  icon: 'dashboard', class: '' },
    { path: '/admin/download', title: 'Generar reporte',  icon:'library_books', class: '' },
    { path: '/table-list', title: 'Enviar correo',  icon:'content_paste', class: '' },
    { path: '/login', title: 'Cerrar sesión',  icon:'notifications', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
