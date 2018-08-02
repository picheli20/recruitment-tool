import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from './interface/project.interface';
import axios from 'axios';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<IProject>) {}

  async findAll() {
    const projects = await this.projectModel.find().exec();

    const workable: any = await axios.get<IProject>('https://www.workable.com/api/accounts/xcaliber');

    const jobs = workable.data.jobs.map((item: IProject) => {
      const result = projects.find(i => i.shortcode === item.shortcode);

      item.repo = result ? result.repo : null;

      return item;
    });

    return jobs;
  }

  async create(project: IProject): Promise<IProject[]> {
    const userValidation = await this.find({ shortcode: project.shortcode });

    if (userValidation.length > 0) {
      throw new HttpException(
        `Project code="${project.shortcode}" already registred`,
        HttpStatus.CONFLICT,
      );
    }

    const repoValidation = await this.find({ repo: project.repo });
    if (repoValidation.length > 0) {
      throw new HttpException(
        `Project with the url="${project.repo}" already registred with name="${project.title}"`,
        HttpStatus.CONFLICT,
      );
    }

    return await new this.projectModel(project).save();
  }

  async find(data: { [s: string]: any }): Promise<IProject[]> {
    return await this.projectModel.find(data).exec();
  }

  async findOne(shortcode: string ): Promise<IProject> {
    return await this.projectModel.findOne({ shortcode }).exec();
  }

  delete(id: string): Promise<IProject> {
    return this.projectModel.findByIdAndRemove(id).exec();
  }

  update(id: string, newProject: IProject): Promise<IProject> {
    return this.projectModel.findByIdAndUpdate(id, newProject).exec();
  }
}
