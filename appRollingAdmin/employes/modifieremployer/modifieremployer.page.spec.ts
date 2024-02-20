import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifieremployerPage } from './modifieremployer.page';

describe('ModifieremployerPage', () => {
  let component: ModifieremployerPage;
  let fixture: ComponentFixture<ModifieremployerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifieremployerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifieremployerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
