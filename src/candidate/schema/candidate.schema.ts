import * as mongoose from 'mongoose';

export const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectUrl: String,
});
