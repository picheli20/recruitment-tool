import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';

describe('Assessment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AssessmentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AssessmentController = module.get<AssessmentController>(AssessmentController);
    expect(controller).toBeDefined();
  });
});
