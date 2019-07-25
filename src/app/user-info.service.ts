import { Injectable } from '@angular/core';
import { Account } from './model/account';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private account : Account
  ) { 
    this.account = new Account();
  }
  isLogin(): boolean {
    if (true)
      return true
    return false
  }
  getToken(): string
  {
    return account.token;
  }
  getUserId(): string
  {
    return account.userId;
  }

}
