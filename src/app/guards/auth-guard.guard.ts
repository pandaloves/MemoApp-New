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

  if (token) {
    return true;
  } else {
    if (!publicRoutes.includes(state.url)) {
      router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
};
