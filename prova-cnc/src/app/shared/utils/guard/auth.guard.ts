import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";

export const AuthGuard : CanMatchFn = ( route, segments ) =>  {
  const router = inject( Router )

  const token  = sessionStorage.getItem("token") ?? "";
  const logged = token !== "";

  if( !logged ){
    return router.createUrlTree(['/login']);
  }

  return true;
}
