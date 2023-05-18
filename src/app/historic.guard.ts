import { CanActivateFn } from '@angular/router';

export const historicGuard: CanActivateFn = (route, state) => {
  return true;
};
