import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutertypeproduitPage } from './ajoutertypeproduit.page';

describe('AjoutertypeproduitPage', () => {
  let component: AjoutertypeproduitPage;
  let fixture: ComponentFixture<AjoutertypeproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutertypeproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutertypeproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
