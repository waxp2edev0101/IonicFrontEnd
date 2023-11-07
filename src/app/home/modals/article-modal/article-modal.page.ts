import { Component, NgModule, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StoryService } from "../../../services/story.service";

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.page.html',
  styleUrls: ['./article-modal.page.scss'],
})

export class ArticleModalPage implements OnInit {
  article: Object;
  favicon: string;

  constructor(
    private storyService: StoryService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.article = this.navParams.data.article;
    this.favicon = this.article["favicon"];
  }

  openLink()
  {
    this.closeModal();
    window.open(this.article["url"], "_blank");
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
