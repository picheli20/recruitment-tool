import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';

describe('Candidate Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CandidateController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CandidateController = module.get<CandidateController>(CandidateController);
    expect(controller).toBeDefined();
  });
});
