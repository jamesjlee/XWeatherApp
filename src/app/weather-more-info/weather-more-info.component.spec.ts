import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMoreInfoComponent } from './weather-more-info.component';

describe('WeatherMoreInfoComponent', () => {
  let component: WeatherMoreInfoComponent;
  let fixture: ComponentFixture<WeatherMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
