export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IHomeBannerContent = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
