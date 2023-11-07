import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { ArticleModalPage } from './article-modal.page';

describe('ArticleModalPage', () => {
  let component: ArticleModalPage;
  let fixture: ComponentFixture<ArticleModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

