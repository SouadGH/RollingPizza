import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifieringredientPage } from './modifieringredient.page';

describe('ModifieringredientPage', () => {
  let component: ModifieringredientPage;
  let fixture: ComponentFixture<ModifieringredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifieringredientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifieringredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
