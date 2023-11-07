import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story.service'
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-assign-category',
  templateUrl: './assign-category.page.html',
  styleUrls: ['./assign-category.page.scss'],
})

export class AssignCategoryPage implements OnInit {
  categoryList: Array<JSON> = new Array<JSON>();
  header: any;

  constructor(
    private storyService: StoryService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.header = this.navParams.data.paramHeader
    this.storyService.getCategories().subscribe(res => {this.categoryList = res});
  }

  selectItem(newchoice) {
    this.header.category = newchoice._id;
    this.header.title = newchoice.title;    
    this.storyService.setCollectionCategory("carousel", this.header._id, newchoice._id).subscribe();
    this.closeModal();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
