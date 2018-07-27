import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentModule } from 'assessment/assessment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/recruitment'),
    AssessmentModule,
  ],
})
export class AppModule {}
