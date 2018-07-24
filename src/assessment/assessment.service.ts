import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from 'core/logger/logger.service';
import { IAssestmentDto } from './dto/post-assestment.dto';
import { CandidateService } from 'candidate/candidate.service';

@Injectable()
export class AssessmentService {

  constructor(
    private readonly loggerService: LoggerService,
    private readonly candidateService: CandidateService,
  ) {}

}
