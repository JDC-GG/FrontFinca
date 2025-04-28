import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaPropiedadesComponent } from './components/propiedad/lista-propiedades/lista-propiedades.component';
import { FormularioPropiedadComponent } from './components/propiedad/formulario-propiedad/formulario-propiedad.component';
import { DetallePropiedadComponent } from './components/propiedad/detalle-propiedad/detalle-propiedad.component';
import { ListaArriendosComponent } from './components/arriendo/lista-arriendos/lista-arriendos.component';
import { SolicitudArriendoComponent } from './components/arriendo/solicitud-arriendo/solicitud-arriendo.component';
import { ListaUsuariosComponent } from './components/usuario/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  // Rutas normales (Home, propiedades, etc.) van sin AppComponent aquí
  { path: '', component: HomeComponent },
  { path: 'propiedades', component: ListaPropiedadesComponent },
  { path: 'propiedades/nueva', component: FormularioPropiedadComponent },
  { path: 'propiedades/:id', component: DetallePropiedadComponent },
  { path: 'arriendos', component: ListaArriendosComponent },
  { path: 'arriendos/solicitar', component: SolicitudArriendoComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },

  // Rutas de autenticación usan su propio layout
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
