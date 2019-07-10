import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

    user: any
    avatar: string
    isLogin: boolean
    dropdown: boolean = false

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.isLogin = this.userService.isLogin()
        this.user = this.userService.userInfo()
        this.avatar = this.userService.getAvatar()
    }


    dropdownStatus() {
        this.dropdown = false
    }
}