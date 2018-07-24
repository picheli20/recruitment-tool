import { Injectable } from '@nestjs/common';
import { ICandidate } from 'candidate/interfaces/candidate.interface';
import { IProject } from 'project/interface/project.interface';

@Injectable()
export class AssessmentService {

  async run(candidate: ICandidate, project: IProject) {
    /*
      * TODO: Add code for:
      *  1: Clone the project repo
      *  2: Clone the candidate repo
      *  3: Replace code from project repo with candidate repo according the project-config.json
      *  4: Run test
      *  5: if (Success) send email with link; else: send email with retry link
    */
    return { candidate, project };
  }
}
