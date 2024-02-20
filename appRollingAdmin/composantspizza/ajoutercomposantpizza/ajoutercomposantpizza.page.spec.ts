import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutercomposantpizzaPage } from './ajoutercomposantpizza.page';

describe('AjoutercomposantpizzaPage', () => {
  let component: AjoutercomposantpizzaPage;
  let fixture: ComponentFixture<AjoutercomposantpizzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutercomposantpizzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutercomposantpizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
