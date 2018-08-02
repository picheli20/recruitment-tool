import { ICandidate } from '../interfaces/candidate.interface';
import { IProject } from '../../project/interface/project.interface';

export interface ICreateCandidateDto {
  candidate: ICandidate;
  project: IProject;
}
