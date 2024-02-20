import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsproduitPage } from './detailsproduit.page';

describe('DetailsproduitPage', () => {
  let component: DetailsproduitPage;
  let fixture: ComponentFixture<DetailsproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
