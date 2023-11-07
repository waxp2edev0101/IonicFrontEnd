import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignCategoryPageRoutingModule } from './assign-category-routing.module';
import { AssignCategoryPage } from './assign-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignCategoryPageRoutingModule
  ],
  declarations: [AssignCategoryPage]
})
export class AssignCategoryPageModule {}
