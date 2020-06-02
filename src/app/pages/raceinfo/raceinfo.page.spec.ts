import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaceinfoPage } from './raceinfo.page';

describe('RaceinfoPage', () => {
  let component: RaceinfoPage;
  let fixture: ComponentFixture<RaceinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaceinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
