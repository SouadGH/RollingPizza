import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListecommandesclientsPage } from './listecommandesclients.page';

describe('ListecommandesclientsPage', () => {
  let component: ListecommandesclientsPage;
  let fixture: ComponentFixture<ListecommandesclientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListecommandesclientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListecommandesclientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
