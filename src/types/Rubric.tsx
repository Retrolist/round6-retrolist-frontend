export interface ICriteria extends Document {
  _id: string;
  title: string;
  isNegative: boolean;
  scores: { [score: string]: string };
}

export interface IRubric extends Document {
  _id: string;
  name: string;
  createdBy: string;
  isActive: boolean;
  categories: string[];
  criteria: ICriteria[];
}