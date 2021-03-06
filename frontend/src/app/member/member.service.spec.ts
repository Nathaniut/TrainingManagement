import { TestBed, inject } from '@angular/core/testing';

import { MemberService } from './member.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberService],
      imports: [ HttpClientTestingModule]
    });
  });

  it('should be created', inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));
});
