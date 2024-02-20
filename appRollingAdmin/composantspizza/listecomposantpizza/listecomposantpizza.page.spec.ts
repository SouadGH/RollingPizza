import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListecomposantpizzaPage } from './listecomposantpizza.page';

describe('ListecomposantpizzaPage', () => {
  let component: ListecomposantpizzaPage;
  let fixture: ComponentFixture<ListecomposantpizzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListecomposantpizzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListecomposantpizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
