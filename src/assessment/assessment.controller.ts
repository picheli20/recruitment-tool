import { Controller, Get, Post, HttpStatus, Body, HttpCode } from '@nestjs/common';

import { IAssestmentDto } from './dto/post-assestment.dto';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {

  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('/request')
  request() {
    return 'Requesting';
  }
}
