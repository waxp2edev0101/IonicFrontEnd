import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignCategoryPage } from './assign-category.page';

const routes: Routes = [
  {
    path: '',
    component: AssignCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignCategoryPageRoutingModule {}
