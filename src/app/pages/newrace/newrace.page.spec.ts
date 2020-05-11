import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewracePage } from './newrace.page';

describe('NewracePage', () => {
  let component: NewracePage;
  let fixture: ComponentFixture<NewracePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewracePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewracePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
