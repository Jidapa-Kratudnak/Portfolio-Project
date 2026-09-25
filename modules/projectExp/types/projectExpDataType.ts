type image = {
  imageURL: string;
  imageDescription: string;
}

export type ProjectExpDataType = {
  images?: image[];
  THprojectName: string;
  ENprojectName: string;
  description: string[];
  technologies: string[];
  language: string[];
};
