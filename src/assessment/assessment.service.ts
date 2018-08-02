import { resolve } from 'path';

import { Injectable } from '@nestjs/common';
import { CandidateService } from './candidate/candidate.service';
import { ProjectService } from './project/project.service';
import { TerminalService } from 'terminal/terminal.service';
import { IProject } from './project/interface/project.interface';
import { ICandidate } from './candidate/interfaces/candidate.interface';

const BASE_PATH = resolve(__dirname, '../../repos');

@Injectable()
export class AssessmentService {

  constructor(
    private readonly candidateService: CandidateService,
    private readonly projectService: ProjectService,
    private readonly terminal: TerminalService,
  ) {
    if (!this.terminal.exists(BASE_PATH)) {
      this.terminal.mkdir(BASE_PATH);
    }
  }

  async run(idProject: string, idCandidate: string) {
    const project = await this.projectService.findOne(idProject);
    const candidate = await this.candidateService.findOne(idCandidate);

    const { candidatePath } = this.createFolders(project, candidate);
    const gitCandidatePath = resolve(candidatePath, './repo');

    this.terminal.rmdir(resolve(candidatePath, './repo'));

    this.terminal.run('git', ['clone', candidate.projectUrl, gitCandidatePath]);

    // this.terminal.run('git', ['clone', candidate.projectUrl, folder]).then(console.log);
    /*
      * TODO: Add code for:
      *  3: Replace code from project repo with candidate repo according the project-config.json
      *  4: Run test
      *  5: if (Success) send email with link; else: send email with retry link
    */
    return { project, candidate };
  }

  // TODO: Create a service
  async runProject(idProject: string, idCandidate: string) {
    const project = await this.projectService.findOne(idProject);
    const candidate = await this.candidateService.findOne(idCandidate);

    const { projectPath } = this.createFolders(project, candidate);
    const gitProjectPath = resolve(projectPath, './repo');

    this.terminal.rmdir(resolve(projectPath, './repo'));

    this.terminal.run('git', ['clone', project.repo, gitProjectPath]);
    return { project };

  }

  createFolders(project: IProject, candidate: ICandidate) {
    const projectPath = resolve(BASE_PATH, `${project.name}`);
    if (!this.terminal.exists(projectPath)) {
      this.terminal.mkdir(projectPath);
    }

    const candidatePath = resolve(BASE_PATH, `${project.name}`, `${candidate._id}`);
    if (!this.terminal.exists(candidatePath)) {
      this.terminal.mkdir(candidatePath);
    }

    return { candidatePath, projectPath };
  }
}
