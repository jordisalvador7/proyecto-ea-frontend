import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RacestatsPage } from './racestats.page';

describe('RacestatsPage', () => {
  let component: RacestatsPage;
  let fixture: ComponentFixture<RacestatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacestatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RacestatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
