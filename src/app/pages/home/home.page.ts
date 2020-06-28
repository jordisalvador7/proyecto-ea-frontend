import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ILoginDto } from 'src/app/models/Dtos/ILoginDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService) {}

  googleLogin(){
    this.authService.signInWithGoogle()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        const loginDto: ILoginDto = {
          username: result.additionalUserInfo.profile.id,
          email: result.additionalUserInfo.profile.email
        }
        this.authService.oauthLogin(loginDto);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  facebookLogin(){
    this.authService.signInWithFacebook()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        const loginDto: ILoginDto = {
          username: result.additionalUserInfo.profile.id,
          email: result.additionalUserInfo.profile.email
        }
        this.authService.oauthLogin(loginDto);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
