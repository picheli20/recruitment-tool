import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentModule } from 'assessment/assessment.module';
import { CandidateModule } from 'candidate/candidate.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    AssessmentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/recruitment'),
    CandidateModule,
    ProjectModule,
  ],
})
export class AppModule {}
