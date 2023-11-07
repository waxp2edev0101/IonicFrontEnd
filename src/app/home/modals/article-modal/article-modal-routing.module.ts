import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleModalPage } from './article-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleModalPageRoutingModule {}
