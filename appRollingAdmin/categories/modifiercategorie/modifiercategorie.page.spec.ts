import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifiercategoriePage } from './modifiercategorie.page';

describe('ModifiercategoriePage', () => {
  let component: ModifiercategoriePage;
  let fixture: ComponentFixture<ModifiercategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiercategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiercategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
