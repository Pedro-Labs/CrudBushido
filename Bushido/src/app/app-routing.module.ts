// import { UpdateComponent } from './components/crud/update.product';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
// import { CreateComponent } from './components/crud/create-product';

const routes: Routes = [
  {
    path: "",
    component: CrudComponent
  },
  // {
  //    path: "create-product",
  //    component: CreateComponent
  // },
  // {
  //   path: "update-product",
  //   component: UpdateComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
