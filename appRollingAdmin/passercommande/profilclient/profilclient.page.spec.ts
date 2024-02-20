import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilclientPage } from './profilclient.page';

describe('ProfilclientPage', () => {
  let component: ProfilclientPage;
  let fixture: ComponentFixture<ProfilclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
