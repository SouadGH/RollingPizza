import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypelivraisonPage } from './typelivraison.page';

describe('TypelivraisonPage', () => {
  let component: TypelivraisonPage;
  let fixture: ComponentFixture<TypelivraisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypelivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypelivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
