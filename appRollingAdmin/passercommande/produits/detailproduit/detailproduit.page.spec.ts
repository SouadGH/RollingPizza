import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DetailproduitPage } from './detailproduit.page';

//import { DetailproduitPage } from './detailproduit.page.ts';

describe('DetailproduitPage', () => {
  let component: DetailproduitPage;
  let fixture: ComponentFixture<DetailproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
