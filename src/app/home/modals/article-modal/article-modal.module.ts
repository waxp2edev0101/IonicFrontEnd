import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleModalPageRoutingModule } from './article-modal-routing.module';

import { ArticleModalPage } from './article-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleModalPageRoutingModule
  ],
  declarations: [ArticleModalPage]
})
export class ArticleModalPageModule {}
