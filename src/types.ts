export type CommentData = {
  id: string,
  name: string,
  email: string,
  content: string,
  createdAt: string,
};

export type ServiceData = {
  id: string,
  name: string,
  description: string,
};

export type ExperienceData = {
  id: string,
  company: string,
  description: string,
  from: string,
  to: string,
};

export type RequestData = CommentData | ServiceData | ExperienceData;
export type RequestDataArray = CommentData[] | ServiceData[] | ExperienceData[] | undefined;
