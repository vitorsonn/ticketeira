import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';

const ADMIN_ROLE = new Set(['ADMIN'])

export const adminGuard: CanActivateFn = (route, state) => {

const router = inject(Router)
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')


if (!token) {
  router.navigate(['/auth']);
  return false;
}
if (!role || !ADMIN_ROLE.has(role)) {
  router.navigate(['/home']);
  return false;
}


  return true;
};
