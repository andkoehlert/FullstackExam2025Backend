export interface Employee extends Document {
  name: string;
  position: string;
  description: string;
  email?: string;
  profileImage?: string;
  bio?: string;
}
