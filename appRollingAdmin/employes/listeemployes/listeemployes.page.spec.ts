import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeemployesPage } from './listeemployes.page';

describe('ListeemployesPage', () => {
  let component: ListeemployesPage;
  let fixture: ComponentFixture<ListeemployesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeemployesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeemployesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
