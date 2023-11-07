import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';
import { StoryService } from "../../../services/story.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  controlBlock = new Array<JSON>()
  activeControlBlock = new Object()
  fromDate = new Date();
  toDate = new Date();
  searchText: string = "";
  carouselBlockOptions: any = {
    header: "Edit Carousel",
    subHeader: "Select carousel to edit"
  };
  builderBlockOptions: any = {
    header: "Add Carousel",
    subHeader: "Add a new carousel"
  };
  @ViewChild("builderSelector", { static: false}) builderSelector: IonSelect;
  @ViewChild("carouselSelector", { static: false}) carouselSelector: IonSelect;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private storyService: StoryService,
    private alertController: AlertController    
    ) { }

  ngOnInit() {
    this.controlBlock = this.navParams.data.controlBlocks
    this.activeControlBlock = this.navParams.data.controlBlocks.find(element => element.name == this.navParams.data.activeSelection)
    let params = this.activeControlBlock["parameters"]
    this.fromDate = new Date(params.find(element => element.name == 'mindate').currentvalue);
    this.toDate = new Date(params.find(element => element.name == 'maxdate').currentvalue);
    this.searchText = params.find(element => element.name == '$text').currentvalue??"";
  }

  ngAfterViewInit()
  {
    this.carouselSelector.value = this.activeControlBlock["instance"];
  }

  setDate(dateType, dateEvent)
  {
    switch(dateType)
    {
      case 0:
        this.fromDate = new Date(dateEvent.detail.value);
        this.activeControlBlock["parameters"].find(element => element.name == 'mindate').currentvalue = this.fromDate.toISOString();
    
        break;
      case 1:
        this.toDate = new Date(dateEvent.detail.value);
        this.activeControlBlock["parameters"].find(element => element.name == 'maxdate').currentvalue = this.toDate.toISOString();
        break;      
    }

  }

  setText(fieldNo, textEvent)
  {
    switch(fieldNo)
    {
      case 0:
        this.searchText = textEvent.detail.value;
        
        this.activeControlBlock["$text"] = this.searchText;    
        this.activeControlBlock["parameters"].find(element => element.name == '$text').currentvalue = this.searchText;
        break
    }
  }

  getBlockID(block)
  {
    return block["instance"];
  }

  changeControlBlock()
  {
    this.activeControlBlock = this.navParams.data.controlBlocks.find(element => element.instance == this.carouselSelector.value);
    this.setPropsFromControlBlock();
  }

  openSelector()
  {
    this.builderSelector.value = 'keyword';
    this.builderSelector.open();
  }

  cancelNewControlBlock()
  {
    this.builderSelector.value = null;
  }

  requestNewControlBlock()
  {
    if (this.builderSelector.value != null)
      this.storyService.getControlBlockTemplate(this.builderSelector.value).subscribe(res => this.respondNewControlBlock(res))    
  }

  async respondNewControlBlock(res)
  {
    this.renameControlBlock(res["controlBlocks"][0], block =>
        {
          this.controlBlock.splice(0, 0, block);
          this.activeControlBlock = this.controlBlock[0];
          this.carouselSelector.value = this.activeControlBlock["instance"];
          this.setPropsFromControlBlock();
        } 
      );    
  }

  async renameControlBlock(block, renameAction)
  {    
    const alert = await this.alertController.create({
      header: "Search Name", 
      subHeader: block["name"],
      inputs: [{name: "newName", type: "text", value: block["name"]}],
      buttons: [
        {
          text: "OK",
          handler: (alertData) => {
            if (alertData.newName != "")
            {
              block["name"] = alertData.newName;
              renameAction(block);  
            }
          }
        }, 
        {
          text: "Cancel", 
          role: "cancel"
        }        
      ]
    });

    await alert.present();
  }

  editControlBlock()
  {
    this.renameControlBlock(this.activeControlBlock, block =>
        {
          this.carouselSelector.value = "";
          this.activeControlBlock = block;
          this.carouselSelector.value = this.activeControlBlock["instance"];
        } 
      );    
  }

  async deleteControlBlock()
  {
    if (this.controlBlock.length == 1)
    {
      const alert = await this.alertController.create({
        header: "Delete", 
        subHeader: "You must have at least one carousel",
        buttons: [ "OK" ]
      });  
      await alert.present();
      return;
    }
    if (this.controlBlock.length > 1)
    {      
      const alert = await this.alertController.create({
        header: "Delete", 
        subHeader: `Delete block ${this.activeControlBlock["name"]}?`,
        buttons: [
          {
            text: "OK",
            handler: (alertData) => {
              this.controlBlock.splice(this.controlBlock.findIndex(element => element["instance"] == this.activeControlBlock["instance"]), 1);
              this.activeControlBlock = this.controlBlock[0];
              this.carouselSelector.value = this.activeControlBlock["instance"];
              this.setPropsFromControlBlock();
            }
          }, 
          {
            text: "Cancel", 
            role: "cancel"
          }        
        ]
      });  
      await alert.present();  
    }
  }

  setPropsFromControlBlock()
  {
    this.fromDate = new Date(this.activeControlBlock["parameters"].find(element => element.name == 'mindate').currentvalue);
    this.toDate = new Date(this.activeControlBlock["parameters"].find(element => element.name == 'maxdate').currentvalue);
    this.searchText = this.activeControlBlock["parameters"].find(element => element.name == '$text').currentvalue??"";
  }

  async closeModal(applySearch = false) {
    let onClosedData = null
    if (applySearch) {
      var params = this.activeControlBlock["parameters"]
      params.find(element => element.name == 'mindate').currentvalue = this.fromDate.toISOString();
      params.find(element => element.name == 'maxdate').currentvalue = this.toDate.toISOString();
      params.find(element => element.name == '$text').currentvalue = this.searchText;
      this.activeControlBlock["parameters"] = params;
      onClosedData = this.activeControlBlock;
    }
    await this.modalController.dismiss(onClosedData);
  }
}
