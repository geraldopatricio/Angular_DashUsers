import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpAuthGuard implements CanActivate {

  constructor(private authService : AuthService , private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      if (localStorage.getItem('emp')) {
        

       
        return true

        
      }else{
        this.router.navigate([''])
        return false
      }

    
  }
  
}
