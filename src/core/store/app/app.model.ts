import { LanguagesAvailable } from 'core/i18n';

export interface AppState {
  readonly lang: LanguagesAvailable;
  readonly darkMode: boolean;
}