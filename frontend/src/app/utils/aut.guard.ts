
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../services/accesos/usuarios.service';
import { lastValueFrom } from 'rxjs';


export const autGuard: CanActivateFn = async(route, state) => {
  const router = inject(Router);
  const ruta = route.url[0].path;
  let token;
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
  }else{
    router.navigate(['/Login']);
    return false;
  }
  if(token==undefined){
    router.navigate(['/Login']);
    return false;
  }
  if(ruta=='NoTienePermisos'){
    return true;
  }
  permiso(ruta).toPromise().then((permiso:any) => {
      return permiso.permiso;
  });
  try {
    const permisos:any = await lastValueFrom(permiso(ruta));
    console.log(permisos.permiso)
    if (permisos.permiso) {
      return true;
    } else {
      router.navigate(['/NoTienePermisos']);
      return false;
    }
  } catch (error) {
    console.error(error);
    router.navigate(['/Login']);
    return false;
  }

};

const permiso:any = (ruta:any)=>{
  const _usuariosService = inject(UsuariosService);
  const body = {
    pagina: ruta
  }

  return _usuariosService.comprobacionPermisos(body);

}
