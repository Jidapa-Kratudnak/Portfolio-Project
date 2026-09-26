type image = {
  imageName: string;
  imagePath: string;
}


export type ExperienceData = {
  id: string;
  company: string;
  location: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string[];
  certificateLink: string;
  images  : image[];
};