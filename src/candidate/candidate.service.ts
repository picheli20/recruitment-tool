import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidate } from './interfaces/candidate.interface';
import { ICreateCandidateDto } from './dto/create-candidate.dto';
import { AssessmentService } from 'assessment/assessment.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
    private readonly assessmentService: AssessmentService,
  ) {}

  async create(createCandidateDto: ICandidate): Promise<ICandidate> {
    const createdCandidate = new this.candidateModel(createCandidateDto);
    return await createdCandidate.save();
  }

  async findAll(): Promise<ICandidate[]> {
    return await this.candidateModel.find().exec();
  }

  async find(data: { [s: string]: any }): Promise<ICandidate[]> {
    return await this.candidateModel.find(data).exec();
  }

  async findOne(_id: string ): Promise<ICandidate> {
    return await this.candidateModel.findOne({ _id }).exec();
  }

  async post({ candidate, project }: ICreateCandidateDto) {
    const userValidation = await this.find({ email: candidate.email });
    if (userValidation.length > 0) {
      throw new HttpException(
        `User email="${candidate.email}" already registred`,
        HttpStatus.CONFLICT,
      );
    }

    const repoValidation = await this.find({ projectUrl: candidate.projectUrl });
    if (repoValidation.length > 0) {
      throw new HttpException(
        `Project with the url="${candidate.projectUrl}" already registred`,
        HttpStatus.CONFLICT,
      );
    }

    const createCandidate = await this.create(candidate);
    this.assessmentService.run(createCandidate, project);
  }

  delete(id: string): Promise<ICandidate> {
    return this.candidateModel.findByIdAndRemove(id).exec();
  }

  update(id: string, newProject: ICandidate): Promise<ICandidate> {
    return this.candidateModel.findByIdAndUpdate(id, newProject).exec();
  }
}
