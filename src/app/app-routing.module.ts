import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { TablaComponent } from './components/tabla/tabla.component';


const routes: Routes = [
  {path: '',component:TablaComponent},
  {path: 'modal',component:ModalComponent},
{path:'**', pathMatch:'full',redirectTo:''},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
