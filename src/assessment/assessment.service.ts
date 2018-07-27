import { Injectable } from '@nestjs/common';
import { CandidateService } from './candidate/candidate.service';
import { ProjectService } from './project/project.service';

@Injectable()
export class AssessmentService {

  constructor(
    private readonly candidateService: CandidateService,
    private readonly projectService: ProjectService,
  ) {}

  async run(idProject: string, idCandidate: string) {
    const project = await this.projectService.findOne(idProject);
    const candidate = await this.candidateService.findOne(idCandidate);
    /*
      * TODO: Add code for:
      *  1: Clone the project repo
      *  2: Clone the candidate repo
      *  3: Replace code from project repo with candidate repo according the project-config.json
      *  4: Run test
      *  5: if (Success) send email with link; else: send email with retry link
    */
    return { project, candidate };
  }
}
