import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CoreModule } from 'core/core.module';
import { AssessmentController } from './assessment.controller';
import { CandidateModule } from 'candidate/candidate.module';

@Module({
  imports: [
    CoreModule.register({ enableLogging: true }),
    CandidateModule,
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
