import { KeycloakService } from 'keycloak-angular'
import { Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

import { environment } from './environment'

export class KcService {
  public isBrowser
  public kc

  constructor(
    private keycloak: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  initializer(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      var token = ' '
      var refreshToken = ' '
      var options

      if (this.isBrowser) {
        const now = new Date().getTime()
        const exp = localStorage.getItem('exprise')

        if (exp != undefined && parseInt(exp) * 1000 > now) {
          token = localStorage.getItem('token') == undefined ? ' ' : localStorage.getItem('token')
          refreshToken = localStorage.getItem('retoken') == undefined ? ' ' : localStorage.getItem('retoken')
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('retoken')
          localStorage.removeItem('exprise')
        }
        options = refreshToken == ' ' ? { checkLoginIframe: false } : { checkLoginIframe: false, token: token, refreshToken: refreshToken }
      }
      try {
        await this.keycloak.init({
          config: environment.keycloak,
          initOptions: options,
          bearerExcludedUrls: []
        })
        this.kc = this.keycloak['_instance'];
        if (this.kc.idToken != undefined && this.isBrowser) {
          localStorage.setItem('token', this.kc.idToken)
          localStorage.setItem('retoken', this.kc.refreshToken)
          localStorage.setItem('exprise', this.kc.refreshTokenParsed.exp)
        }
        resolve()
      } catch (error) {
        if (this.isBrowser) {
          localStorage.removeItem('token')
          localStorage.removeItem('retoken')
          localStorage.removeItem('exprise')
        }
        location.reload();
        reject(error)
      }
    })
  }
  getToken(): string {
    return this.kc.token;
  }

  async userInfo(){
    return await this.keycloak.loadUserProfile()
  }
}

export function KcServiceInit(kc: KcService): () => void {
  return () => kc.initializer();
}

