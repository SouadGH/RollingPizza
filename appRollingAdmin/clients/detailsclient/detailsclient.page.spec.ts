import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsclientPage } from './detailsclient.page';

describe('DetailsclientPage', () => {
  let component: DetailsclientPage;
  let fixture: ComponentFixture<DetailsclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
