import { GET_RANOBE, GET_TOP } from '../constants/url';
import { Ranobe, RanobeDetails, RanobeTop } from '../types/ranobe';
import api from './axios';

export const getRanobes = () => {
  return api.get<Ranobe[]>(`${GET_RANOBE}`);
};

export const getTopRanobes = () => {
  return api.get<RanobeTop[]>(`${GET_RANOBE}${GET_TOP}`);
};

export const getRanobeById = (id: string) => {
  return api.get<RanobeDetails>(`${GET_RANOBE}/${id}`);
};
