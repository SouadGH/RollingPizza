import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeingredientsPage } from './listeingredients.page';

describe('ListeingredientsPage', () => {
  let component: ListeingredientsPage;
  let fixture: ComponentFixture<ListeingredientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeingredientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeingredientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
