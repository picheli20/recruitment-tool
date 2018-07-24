import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';

describe('CandidateService', () => {
  let service: CandidateService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateService],
    }).compile();
    service = module.get<CandidateService>(CandidateService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
