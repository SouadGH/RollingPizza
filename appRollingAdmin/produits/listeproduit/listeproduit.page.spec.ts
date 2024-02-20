import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeproduitPage } from './listeproduit.page';

describe('ListeproduitPage', () => {
  let component: ListeproduitPage;
  let fixture: ComponentFixture<ListeproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
