import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaPropiedadesComponent } from './components/propiedad/lista-propiedades/lista-propiedades.component';
import { FormularioPropiedadComponent } from './components/propiedad/formulario-propiedad/formulario-propiedad.component';
import { DetallePropiedadComponent } from './components/propiedad/detalle-propiedad/detalle-propiedad.component';
import { EditarPropiedadComponent } from './components/propiedad/editar-propiedad/editar-propiedad.component'; 
import { ListaArriendosComponent } from './components/arriendo/lista-arriendos/lista-arriendos.component';
import { SolicitudArriendoComponent } from './components/arriendo/solicitud-arriendo/solicitud-arriendo.component';
import { ListaUsuariosComponent } from './components/usuario/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FormularioUsuarioComponent } from './components/usuario/formulario-usuario/formulario-usuario.component';
import { ListaSolicitudesComponent } from './components/arriendo/lista-solicitudes/lista-solicitudes.component';
import { SolicitudesRecibidasComponent } from './pages/solicitudes-recibidas/solicitudes-recibidas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'propiedades', component: ListaPropiedadesComponent },
  { path: 'propiedades/nueva', component: FormularioPropiedadComponent },
  { path: 'propiedades/:id', component: DetallePropiedadComponent },
  { path: 'propiedades/:id/editar', component: EditarPropiedadComponent }, 
  { path: 'arriendos', component: ListaArriendosComponent },
  { path: 'arriendos/solicitudes', component: ListaSolicitudesComponent },
  { path: 'arriendos/solicitar/:id', component: SolicitudArriendoComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'usuarios/calificar', component: FormularioUsuarioComponent },

  
  {
    path: 'ver-solicitudes', 
    loadComponent: () =>
      import('./components/arrendador/solicitudes-recibidas/solicitudes-recibidas.component')
        .then(m => m.SolicitudesRecibidasComponent)
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },

  {
  path: 'arriendos/pagar/:id',
  loadComponent: () =>
    import('./components/arriendo/pago-arriendo/pago-arriendo.component')
      .then(m => m.PagoArriendoComponent)
},

  
  { path: '**', redirectTo: '' }
];
