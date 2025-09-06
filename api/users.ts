import api from './config';

export interface CreateUserAtRegisterPayload {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateUserAtRegisterResponse<TUser = any> {
  created: boolean;
  user: TUser;
}

export const createUserAtRegister = async <TUser = any>(
  payload: CreateUserAtRegisterPayload,
): Promise<CreateUserAtRegisterResponse<TUser>> => {
  const { data } = await api.post<CreateUserAtRegisterResponse<TUser>>(
    '/users/register',
    payload,
  );

  return data;
};

export const getLoggedUser = async <TUser = any>(): Promise<TUser> => {
  const { data } = await api.get<TUser>('/users/me');
  
  return data;
};
