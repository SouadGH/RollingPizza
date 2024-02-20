import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutercategoriePage } from './ajoutercategorie.page';

describe('AjoutercategoriePage', () => {
  let component: AjoutercategoriePage;
  let fixture: ComponentFixture<AjoutercategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutercategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutercategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
