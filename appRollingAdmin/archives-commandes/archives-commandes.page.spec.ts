import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArchivesCommandesPage } from './archives-commandes.page';

describe('ArchivesCommandesPage', () => {
  let component: ArchivesCommandesPage;
  let fixture: ComponentFixture<ArchivesCommandesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesCommandesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivesCommandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
