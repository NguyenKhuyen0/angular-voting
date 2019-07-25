import { Injectable } from '@angular/core';
import { CustomKeyCloak } from './model/custom_keycloack';
import { from } from 'rxjs';
import { environment } from "./environment";

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  have_token = false;
  customKeyCloak : CustomKeyCloak;
  keyCloakSubject = new BehaviorSubject(new CustomKeyCloak());

  constructor(

  ) { 

    var $this = this;
    window.addEventListener('message', function(e) {
      console.log('e.origin',e.origin);
      console.log("environment.urlParentWindow", environment.urlParentWindow);
      if (e.origin == environment.urlParentWindow) {
        if(e.data && e.data.subject)
        {
          console.log('childrend recieve message', e.data);
              $this.keyCloakSubject.next(e.data);
          }
          
      } 
    }, false);

    this.keyCloakSubject.subscribe(customKeyCloak  => {

        this.customKeyCloak = customKeyCloak;
    })


  }



  logIn()
  {
      window.parent.postMessage({
        'msg': 'Login'
      }, "*");
  }

  isTokenExpired(customKeyCloak: CustomKeyCloak) {
    if(!customKeyCloak.token) return true;
    if (!customKeyCloak.tokenParsed || (!customKeyCloak.refreshToken && customKeyCloak.flow != 'implicit' )) {
        throw 'Not authenticated';
    }

    if (customKeyCloak.timeSkew == null) {
        console.info('[KEYCLOAK] Unable to determine if token is expired as timeskew is not set');
        return true;
    }

    var expiresIn = customKeyCloak.tokenParsed['exp'] - Math.ceil(new Date().getTime() / 1000) + customKeyCloak.timeSkew;

    return expiresIn < 0;
}

}
