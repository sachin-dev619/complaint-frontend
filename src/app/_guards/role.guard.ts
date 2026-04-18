import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  let user: any = null;

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    user = null;
  }

  // ❌ Not logged in
  if (!user || !user.role) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {

    switch (user.role) {
      case 'admin':
        router.navigate(['/admin/dashboard']);
        break;
      case 'student':
        router.navigate(['/student/dashboard']);
        break;
      default:
        router.navigate(['/login']);
    }

    return false;
  }

  return true;
};