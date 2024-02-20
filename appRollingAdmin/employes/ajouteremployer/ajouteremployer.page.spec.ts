import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouteremployerPage } from './ajouteremployer.page';

describe('AjouteremployerPage', () => {
  let component: AjouteremployerPage;
  let fixture: ComponentFixture<AjouteremployerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteremployerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouteremployerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
