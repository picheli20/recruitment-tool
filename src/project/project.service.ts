import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from './interface/project.interface';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<IProject>) {}

  async findAll(): Promise<IProject[]> {
    return await this.projectModel.find().exec();
  }

  async create(project: IProject): Promise<IProject[]> {
    const userValidation = await this.find({ name: project.name });

    if (userValidation.length > 0) {
      throw new HttpException(
        `Project name="${project.name}" already registred`,
        HttpStatus.CONFLICT,
      );
    }

    const repoValidation = await this.find({ projectUrl: project.repo });
    if (repoValidation.length > 0) {
      throw new HttpException(
        `Project with the url="${project.repo}" already registred with name="${project.repo}"`,
        HttpStatus.CONFLICT,
      );
    }

    return await new this.projectModel(project).save();
  }

  async find(data: { [s: string]: any }): Promise<IProject[]> {
    return await this.projectModel.find(data).exec();
  }

  delete(id: string): Promise<IProject> {
    return this.projectModel.findByIdAndRemove(id).exec();
  }

  update(id: string, newProject: IProject): Promise<IProject> {
    return this.projectModel.findByIdAndUpdate(id, newProject).exec();
  }
}
