import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouteringredientPage } from './ajouteringredient.page';

describe('AjouteringredientPage', () => {
  let component: AjouteringredientPage;
  let fixture: ComponentFixture<AjouteringredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteringredientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouteringredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
