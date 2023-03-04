import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
{path:"", redirectTo:'/home', pathMatch:'full'},
  {path:"home", component: HomeComponent},
  {path:'cart', component:CartComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
