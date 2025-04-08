
import { User } from './user';


export interface Project extends Document {
  name: string;
  description: string;
  lokation: string;
  startDate: Date;
  endDate: Date;
  status: string;
  contract: string;
  _createdBy: User['id'];
}