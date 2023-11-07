import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router"
import { StoryService } from "../services/story.service";
import { IonSlides, IonVirtualScroll, ModalController} from '@ionic/angular';
import { ArticleModalPage } from "./modals/article-modal/article-modal.page";
import { AssignCategoryPage } from "./modals/assign-category/assign-category.page";
import { SearchPage } from "./modals/search-modal/search.page"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChildren(IonSlides, {read: ViewContainerRef}) htslides: QueryList<IonSlides>;
  @ViewChildren(IonSlides) slides: QueryList<IonSlides>;
  dataBlocks: Array<JSON> = new Array<JSON>();
  controlBlock = new Object();
  dataReturned: any;
  newRequest = false;
  mode: string = '';
  sub: any;

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 'auto',
    spaceBetween: 5,
    centeredSlides: false,
  }
  
  constructor(private storyService: StoryService, public modalController: ModalController, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {    
    this.sub = this.route.queryParams.subscribe(params => { this.mode = params["mode"] || "" })
    this.storyService.getControlBlocks().subscribe(res => this.processControlBlocks(res))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  processControlBlocks(controlBlocks)
  {
    this.storyService.postControlBlocks(controlBlocks).subscribe(res => this.processResponseBlocks(res));
  }

  processResponseBlocks(carouselResponse)
  {
    console.log('carousel response', carouselResponse)
    
    this.controlBlock = carouselResponse.controlBlock;

    if (carouselResponse.dataBlocks.length > 0)
    {
      if (this.newRequest)
      {
        this.newRequest = false;
        this.dataBlocks = new Array<JSON>();
      }
      carouselResponse.dataBlocks.forEach(element => {
        this.dataBlocks.push(element);
      });
      this.virtualScroll.checkEnd();
      if (!carouselResponse.controlBlock.complete)
        this.storyService.postControlBlocks(carouselResponse.controlBlock).subscribe(res => this.processResponseBlocks(res));
    }
  }

  listHeader(record, recordIndex, records) {
    if ((recordIndex == 0 || record.heading != records[recordIndex-1].heading) && record.heading && record.articles.length != 0)
    {      
      return record.heading;
    }
    return null
  }

  emptyCarousel(item)
  {
    return (item.articles.length == 0);
  }

  isDesktop() : boolean
  {
    return (window.matchMedia("only screen and (min-width: 992px)").matches);
  }
  
  swipeNext(swipeSelector)
  {
    this.getSlidesById(swipeSelector).slideNext()
  }
  
  swipePrev(swipeSelector)
  {
    this.getSlidesById(swipeSelector).slidePrev()
  }

  getSlidesById(slideId) : IonSlides
  {
    for(let n = 0; n < this.htslides.length; n++)
    {
      if ((<ViewContainerRef>(<unknown>this.htslides.get(n))).element.nativeElement.id == slideId)
      {
        return this.slides.get(n)
      }
    }
    return null;
  }

  async showSearch()
  {
    const modal = await this.modalController.create({
      component: SearchPage,
      cssClass: "articleClass",
      componentProps: {
        controlBlocks: this.controlBlock["controlBlocks"],
        activeSelection: 'Top Stories'
      }
    })
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data !== null) {
        this.newRequest = true;

        // Reset the length to allow full population of each block
        this.controlBlock["complete"] = false;
        this.controlBlock["controlBlocks"].forEach(element => {
          element.length = 0;
          element.complete = false;
        });
        this.processControlBlocks(this.controlBlock)
      }
    });

    return await modal.present();
  }

  async assignCategory(header)
  {
    const modal = await this.modalController.create({
      component: AssignCategoryPage,
      cssClass: "articleClass",
      componentProps: {
        "paramHeader": header
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  async openArticle(article) {
    const modal = await this.modalController.create({
      component: ArticleModalPage,
      cssClass: "articleClass",
      componentProps: {
        "article": article
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }
}
