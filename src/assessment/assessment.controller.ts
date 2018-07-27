import { Controller, Get, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {

  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('run/:idProject/:idCandidate')
  async run(@Param('idProject') idProject: string, @Param('idCandidate') idCandidate: string) {
    return await this.assessmentService.run(idProject, idCandidate);
  }
}
