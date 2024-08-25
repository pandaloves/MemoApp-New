import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const publicRoutes: string[] = ['/login', '/signup'];
  const token = storageService.getItem('token');

  if (publicRoutes.includes(state.url) || token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
