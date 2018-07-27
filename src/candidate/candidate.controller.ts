import { Controller, Get, Post, HttpCode, HttpStatus, Body, Param, Put, HttpException, Delete } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ICandidate } from './interfaces/candidate.interface';
import { ICreateCandidateDto } from './dto/create-candidate.dto';
import { AssessmentService } from 'assessment/assessment.service';

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
  post(@Body() data: ICreateCandidateDto) {
    return this.candidateService.post(data);
  }

  @Get(':id')
  find(
    @Param('id')
    id: string,
  ): Promise<ICandidate> {
    return this.candidateService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: ICandidate) {
    const project = await this.candidateService.update(id, updateProjectDto);

    project.email = updateProjectDto.email;
    project.name = updateProjectDto.name;
    project.projectUrl = updateProjectDto.projectUrl;

    return { success: true, data: project };
  }

  @Get('run/:id')
  async run(@Param('id') id: string) {
    return this.candidateService.run(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const project = await this.candidateService.delete(id);
    return { success: true, data: project };
  }
}
