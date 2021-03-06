import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateSchema } from './schema/candidate.schema';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
    ProjectModule,
  ],
  providers: [CandidateService],
  exports: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
