import { Controller, Get, Param, HttpStatus, Post, HttpCode, Body, Put, Delete, HttpException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { IProject } from './interface/project.interface';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<IProject[]> {
    return this.projectService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProjectDto: IProject): Promise<IProject[]> {
    return this.projectService.create(createProjectDto);
  }

  @Get(':id')
  find(
    @Param('id')
    id: string,
  ): Promise<IProject> {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: IProject) {
    const project = await this.projectService.update(id, updateProjectDto);

    project.repo = updateProjectDto.repo;
    project.shortcode = updateProjectDto.shortcode;

    return { success: true, data: project };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const project = await this.projectService.delete(id);
    return { success: true, data: project };
  }
}
