import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSettingsBarComponent } from './dashboard-settings-bar.component';

describe('DashboardSettingsBarComponent', () => {
  let component: DashboardSettingsBarComponent;
  let fixture: ComponentFixture<DashboardSettingsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSettingsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSettingsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
