import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'article-modal',
    loadChildren: () => import('./modals/article-modal/article-modal.module').then( m => m.ArticleModalPageModule)
  },
  {
    path: 'assign-category',
    loadChildren: () => import('./modals/assign-category/assign-category.module').then( m => m.AssignCategoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
