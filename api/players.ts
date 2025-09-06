import api from './config';

interface ICreatePlayerPayload {
  groupId: string;
  players: {
    firstName: string;
    lastName: string;
    number?: string;
    assignments?: {
      unit: string;
      position: string;
    }[];
  }[];
}

interface IUpdatePlayerPayload {
  unit?: string;
  position?: string;
  string?: string;
}

export const createPlayers = async (payload: ICreatePlayerPayload) => {
  const { data } = await api.post('/players', payload);

  return data;
};

export const updatePlayerString = async (playerId: string, payload: IUpdatePlayerPayload) => {
  const { data } = await api.patch(`/players/${playerId}/string`, payload);

  return data;
};

export const getPlayers = async (groupId: string) => {
  const { data } = await api.get(`/players/${groupId}`);

  return data;
}

export const getPlayersByUnit = async (groupId: string, unit: string) => {
  const { data } = await api.get(`/players/unit/${groupId}`, {
    params: { unit },
  });

  return data;
};
