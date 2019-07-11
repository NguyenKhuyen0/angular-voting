import { Injectable, Inject, PLATFORM_ID } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { KeycloakService } from "keycloak-angular"

import { environment } from "../environment"
import { throwError } from "rxjs";

@Injectable()

export class UserService {

  private isBrowser: boolean
  private kc = this.keycloakService['_instance']

  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { this.isBrowser = isPlatformBrowser(this.platformId) }

  userInfo() {
    if (this.isLogin)
      return this.kc.profile
  }
  userID()
  {
    if (this.isLogin)
    return this.kc.subject
  }
  kcO()
  {
    return this.kc;
  }

  isLogin(): boolean {
    if (this.checkToken())
      return this.kc.authenticated
    return false
  }

  async getToken(): Promise<any> {
    if (this.isLogin()) {
      if (this.keycloakService.isTokenExpired)
        return this.kc.idToken
      else {
        this.setRefreshToken()
        return await this.keycloakService.getToken()
      }
    }
    return null
  }

  setRefreshToken() {
    if (this.isBrowser)
      localStorage.setItem('retoken', this.kc.refreshToken)
  }

  getAvatar(): string {
    if (this.isLogin())
      try {
        return this.kc.profile.attributes.picture[0]
      } catch (error) { throwError }
    return '../../assets/images/thumbnails/avatar/avatar-1.jpg'
  }

  checkToken(): boolean {
    const now = new Date().getTime()
    if (this.isBrowser) {
      const exp = localStorage.getItem('exprise')
      if (exp != undefined && parseInt(exp) * 1000 > now)
        return true
    }
    return false
  }

  logIn() {
    this.keycloakService.login()
  }

  logOut() {
    if (this.isBrowser) {
      localStorage.removeItem('token')
      localStorage.removeItem('retoken')
      localStorage.removeItem('exprise')
    }
    this.keycloakService.logout()

  }

  openUserPanel() {
    
    if (this.isBrowser)
      window.open(environment.keycloak.url + "realms/master/account", "_blank")
  }
}