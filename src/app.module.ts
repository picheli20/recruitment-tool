import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentModule } from './assessment/assessment.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    AssessmentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/recruitment'),
    CandidateModule,
  ],
})
export class AppModule {}
