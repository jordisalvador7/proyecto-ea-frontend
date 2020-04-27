import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RacesPage } from './races.page';

describe('RacesPage', () => {
  let component: RacesPage;
  let fixture: ComponentFixture<RacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
