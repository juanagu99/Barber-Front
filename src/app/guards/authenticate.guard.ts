import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor( private router: Router){ }

  currentUser(): boolean {
    if(localStorage.getItem("userType") === null 
    || localStorage.getItem("userType") === 'null'
    || localStorage.getItem("userType") === undefined ){
      return false;
    }else{
      return true;
    }  
  }

  canActivate(){
    if(this.currentUser()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
