import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartenairePage } from './partenaire.page';

describe('PartenairePage', () => {
  let component: PartenairePage;
  let fixture: ComponentFixture<PartenairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartenairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartenairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
