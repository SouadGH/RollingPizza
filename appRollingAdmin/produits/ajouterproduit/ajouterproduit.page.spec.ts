import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterproduitPage } from './ajouterproduit.page';

describe('AjouterproduitPage', () => {
  let component: AjouterproduitPage;
  let fixture: ComponentFixture<AjouterproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
