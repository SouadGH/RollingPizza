import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailemployePage } from './detailemploye.page';

describe('DetailemployePage', () => {
  let component: DetailemployePage;
  let fixture: ComponentFixture<DetailemployePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailemployePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailemployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
