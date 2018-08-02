import { Controller, Get, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {

  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('run/candidate/:idCandidate')
  async run(@Param('idCandidate') idCandidate: string) {
    return await this.assessmentService.run(idCandidate);
  }

  @Get('run/:idProject')
  async runProject(@Param('idProject') idProject: string) {
    return await this.assessmentService.runProject(idProject);
  }
}
