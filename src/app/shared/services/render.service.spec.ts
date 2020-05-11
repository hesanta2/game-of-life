/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RenderService } from './render.service';

describe('Service: Render', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderService]
    });
  });

  it('should ...', inject([RenderService], (service: RenderService) => {
    expect(service).toBeTruthy();
  }));
});
