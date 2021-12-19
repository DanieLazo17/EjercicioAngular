import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ValidadorGuard } from './validaciones/validador.guard';

const routes: Routes = [
  {path:'perfil', component:PerfilComponent, canActivate:[ValidadorGuard]},
  {path:'', component:LoginComponent},
  {path:'**', component:NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
