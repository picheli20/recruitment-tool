import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  shortcode: String,
  repo: String,
});
