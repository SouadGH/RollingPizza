import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifiertypeproduitPage } from './modifiertypeproduit.page';

describe('ModifiertypeproduitPage', () => {
  let component: ModifiertypeproduitPage;
  let fixture: ComponentFixture<ModifiertypeproduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiertypeproduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiertypeproduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
