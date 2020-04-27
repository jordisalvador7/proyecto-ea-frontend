import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleComponent } from './google.component';

describe('GoogleComponent', () => {
  let component: GoogleComponent;
  let fixture: ComponentFixture<GoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
