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

export type IPermission = {
  id: string;
  title: string;
};

export type IAdmin = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contactNo: string;
  address: string;
  profileImage: string;
  username: string;
  permissionId: string;
  createdAt: string;
  updatedAt: string;
  permission: IPermission;
};

export type IService = {
  id: string;
  title: string;
  description: string;
  features: string[];
  charge: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type IPackage = {
  id: string;
  title: string;
  bandwidth: string;
  charge: number;
  features: string[];
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  service: IService;
}
export type IBlog = {
    id: string;
    title: string;
    content: string;
    image: string;
    blogCategoryId: string;
    createdAt: Date;
    updatedAt: Date;
}
