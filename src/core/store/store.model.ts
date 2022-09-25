import { AppState } from './app/app.model';

export interface StoreState {
  readonly app: AppState;
}