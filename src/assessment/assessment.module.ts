import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CandidateModule } from './candidate/candidate.module';
import { ProjectModule } from './project/project.module';
import { AssessmentController } from './assessment.controller';
import { TerminalModule } from 'terminal/terminal.module';

@Module({
  providers: [AssessmentService],
  imports: [CandidateModule, ProjectModule, TerminalModule],
  exports: [AssessmentService],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
