import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateSchema } from './schema/candidate.schema';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
  ],
  providers: [CandidateService],
  exports: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
