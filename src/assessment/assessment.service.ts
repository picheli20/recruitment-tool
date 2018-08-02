import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

import { CandidateService } from './candidate/candidate.service';
import { ProjectService } from './project/project.service';
import { TerminalService } from 'terminal/terminal.service';
import { IProject } from './project/interface/project.interface';
import { ICandidate } from './candidate/interfaces/candidate.interface';
import { IProjectConfig } from './interfaces/project-config.interface';

const BASE_PATH = resolve(__dirname, '../../repos');
const MAIN_FOLDER = 'main';
const CANDIDATE_FOLDER = 'main';

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

  async run(idCandidate: string) {
    const candidate = await this.candidateService.findOne(idCandidate);
    const project = await this.projectService.findOne(candidate.projectCode);

    const { candidatePath, projectPath } = this.createFolders(project, candidate);
    const gitCandidatePath = resolve(candidatePath, `./${CANDIDATE_FOLDER}`);
    const gitProjectPath = resolve(projectPath, `./${MAIN_FOLDER}`);

    this.terminal.rmdir(gitCandidatePath);

    await this.terminal.run('git', ['clone', candidate.projectUrl, gitCandidatePath]);

    const projectConfig: IProjectConfig = JSON.parse(readFileSync(resolve(gitProjectPath, './config.json'), 'utf8'));

    // TOOD: Replace code from project repo with candidate repo according the project-config.json

    const outInstall = await this.runConfigCommand(projectConfig.run.install, gitCandidatePath);
    const outTest = await this.runConfigCommand(projectConfig.run.test, gitCandidatePath);

    /*
      * TODO: if (Success) send email with link; else: send email with retry link
    */

    return { project, candidate, outTest, outInstall };
  }

  async runProject(idProject: string) {
    const project = await this.projectService.findOne(idProject);

    const { projectPath } = this.createFolders(project);
    const gitProjectPath = resolve(projectPath, `./${MAIN_FOLDER}`);

    this.terminal.rmdir(gitProjectPath);

    await this.terminal.run('git', ['clone', project.repo, gitProjectPath]);

    return { project };

  }

  createFolders(project: IProject, candidate?: ICandidate) {
    const projectPath = resolve(BASE_PATH, `${project.shortcode}`);
    if (!this.terminal.exists(projectPath)) {
      this.terminal.mkdir(projectPath);
    }

    if (!candidate) {
      return { projectPath };
    }

    const candidatePath = resolve(BASE_PATH, `${project.shortcode}`, `${candidate._id}`);
    if (!this.terminal.exists(candidatePath)) {
      this.terminal.mkdir(candidatePath);
    }

    return { candidatePath, projectPath };
  }

  private async runConfigCommand(commandArr: string[], cwd: string) {
    const out = [];
    for (const item of commandArr) {
      const args = item.split(' ');
      const command = args.shift();
      out.push(await this.terminal.run(command, args, { cwd }));
    }

    return out;
  }
}
