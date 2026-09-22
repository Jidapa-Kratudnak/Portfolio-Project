type EducationType = {
  institution: string;
  campus: string;
  province: string;
  faculty: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa: number;
  honors: string;
  relatedCourses: string[];
};

export type EducationsDataType = {
    educationList: EducationType[];
}