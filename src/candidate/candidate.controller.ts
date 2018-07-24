import { Controller, Get, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ICandidate } from './interfaces/candidate.interface';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) {}

  @Get()
  async get() {
    return await this.candidateService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() data: ICandidate) {
    return this.candidateService.post(data);
  }
}
