// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ListaPropiedadesComponent } from './components/propiedad/lista-propiedades/lista-propiedades.component';
import { DetallePropiedadComponent } from './components/propiedad/detalle-propiedad/detalle-propiedad.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { FormularioPropiedadComponent } from './components/propiedad/formulario-propiedad/formulario-propiedad.component';
import { ListaArriendosComponent } from './components/arriendo/lista-arriendos/lista-arriendos.component';
import { ListaUsuariosComponent } from './components/usuario/lista-usuarios/lista-usuarios.component';
import { SolicitudArriendoComponent } from './components/arriendo/solicitud-arriendo/solicitud-arriendo.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'propiedades', component: ListaPropiedadesComponent },
  { path: 'propiedades/nueva', component: FormularioPropiedadComponent },
  { path: 'propiedades/:id', component: DetallePropiedadComponent },
  { path: 'arriendos', component: ListaArriendosComponent },
  { path: 'arriendos/solicitar', component: SolicitudArriendoComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: '**', redirectTo: 'propiedades' }
];