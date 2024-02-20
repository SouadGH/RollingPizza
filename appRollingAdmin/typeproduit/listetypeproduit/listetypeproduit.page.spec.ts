import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListetypeproduitPage } from './listetypeproduit.page';

describe('ListetypeproduitPage', () => {
  let component: ListetypeproduitPage;
  let fixture: ComponentFixture<ListetypeproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListetypeproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListetypeproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
