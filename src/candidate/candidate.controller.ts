import { Controller, Get, Post, HttpCode, HttpStatus, Body, Param, Put, HttpException, Delete } from '@nestjs/common';
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

  @Get(':id')
  async find(
    @Param('id')
    id: number,
  ): Promise<ICandidate> {
    const projects = await this.candidateService.find({ _id: id });

    if (projects.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (projects.length > 1) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return projects[0];
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: ICandidate) {
    const project = await this.candidateService.update(id, updateProjectDto);

    project.email = updateProjectDto.email;
    project.name = updateProjectDto.name;
    project.projectUrl = updateProjectDto.projectUrl;

    return { success: true, data: project };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const project = await this.candidateService.delete(id);
    return { success: true, data: project };
  }
}
