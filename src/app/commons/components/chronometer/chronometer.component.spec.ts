import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronometerComponent } from './chronometer.component';

describe('ChronometerComponent', () => {
  let component: ChronometerComponent;
  let fixture: ComponentFixture<ChronometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronometerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
