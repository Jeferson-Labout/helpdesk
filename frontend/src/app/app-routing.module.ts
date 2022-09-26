import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BodyComponent } from './body/body.component';
import { ChamadoCreateComponent } from './chamado/chamado-create/chamado-create.component';
import { ChamadoComponent } from './chamado/chamado.component';
import { ClienteCreateComponent } from './cliente/cliente-create/cliente-create.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TecnicoCreateComponent } from './tecnico/tecnico-create/tecnico-create.component';
import { TecnicoComponent } from './tecnico/tecnico.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },

  { path:'', component: BodyComponent, canActivate: [AuthGuard],
  children: [  
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tecnico', component: TecnicoComponent },
    { path: 'tecnico/create', component: TecnicoCreateComponent },
    { path: 'tecnico/update/:id', component: TecnicoCreateComponent },
    { path: 'tecnico/delete/:id', component: TecnicoCreateComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'cliente/create', component: ClienteCreateComponent },
    { path: 'cliente/update/:id', component: ClienteCreateComponent },
    { path: 'cliente/delete/:id', component: ClienteCreateComponent },
    { path: 'chamado', component: ChamadoComponent },
    { path: 'chamado/create', component: ChamadoCreateComponent },
    { path: 'chamado/update/:id', component: ChamadoCreateComponent },
    { path: 'chamado/read/:id', component: ChamadoCreateComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
