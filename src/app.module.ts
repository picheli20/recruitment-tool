import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentModule } from 'assessment/assessment.module';
import { TerminalModule } from './terminal/terminal.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/recruitment'),
    AssessmentModule,
    TerminalModule,
  ],
})
export class AppModule {}
