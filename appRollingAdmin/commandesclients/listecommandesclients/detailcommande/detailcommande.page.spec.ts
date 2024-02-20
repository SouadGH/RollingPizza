import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailcommandePage } from './detailcommande.page';

describe('DetailcommandePage', () => {
  let component: DetailcommandePage;
  let fixture: ComponentFixture<DetailcommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailcommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
