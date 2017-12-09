import { TestBed, inject } from '@angular/core/testing';

import { GridSettingsService } from './grid-settings.service';

describe('GridSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridSettingsService]
    });
  });

  it('should be created', inject([GridSettingsService], (service: GridSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
