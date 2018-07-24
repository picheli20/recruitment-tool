import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidate } from './interfaces/candidate.interface';
import { ICreateCandidateDto } from './dto/create-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(@InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>) {}

  async create(createCandidateDto: ICreateCandidateDto): Promise<ICandidate> {
    const createdCandidate = new this.candidateModel(createCandidateDto);
    return await createdCandidate.save();
  }

  async findAll(): Promise<ICandidate[]> {
    return await this.candidateModel.find().exec();
  }

  async find(data: { [s: string]: any }): Promise<ICandidate[]> {
    return await this.candidateModel.find(data).exec();
  }

  async post(candidate: ICandidate) {
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

    return this.create(candidate);
  }
}
