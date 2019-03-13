import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeatherWidgetComponent } from './add-weather-widget.component';

describe('AddWeatherWidgetComponent', () => {
  let component: AddWeatherWidgetComponent;
  let fixture: ComponentFixture<AddWeatherWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeatherWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
