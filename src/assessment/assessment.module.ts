import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CandidateModule } from 'candidate/candidate.module';
import { ProjectModule } from 'project/project.module';

@Module({
  providers: [AssessmentService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
