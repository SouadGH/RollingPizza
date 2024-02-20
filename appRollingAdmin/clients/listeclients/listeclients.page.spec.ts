import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeclientsPage } from './listeclients.page';

describe('ListeclientsPage', () => {
  let component: ListeclientsPage;
  let fixture: ComponentFixture<ListeclientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeclientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeclientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
