import api from './config';

interface CreateGroupPayload {
  name: string;
  code?: string;
}

export interface IGroup {
  _id: string,
  name: string,
  code: string,
  coaches: string[]
  roster: string[],
}

export interface IJoinGroupPayload {
  code: String
}

export const createGroup = async (payload: CreateGroupPayload) => {
  const { data } = await api.post('/groups', payload);
  return data;
};

export const getGroups = async (): Promise<IGroup[]> => {
  const { data } = await api.get('/groups');
  return data;
};

export const joinGroup = async (payload: IJoinGroupPayload): Promise<IGroup> => {
  const { data } = await api.post('/groups/join', payload);
  return data;
};
