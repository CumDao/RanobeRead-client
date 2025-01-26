import { SETTINGS } from '../constants/keys';
import Settings from '../types/settings';

export const getSettings = (): Settings => {
  const settings = localStorage.getItem(SETTINGS);
  return settings ? JSON.parse(settings) : { theme: 'system' };
};

export const setSettings = (settings: Settings) =>
  localStorage.setItem(SETTINGS, JSON.stringify(settings));
