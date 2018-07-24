import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateSchema } from './schema/candidate.schema';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { AssessmentModule } from '../assessment/assessment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
    AssessmentModule,
  ],
  providers: [CandidateService],
  exports: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
