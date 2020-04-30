import { Component, OnInit } from '@angular/core';
import { IRegisterDto } from 'src/app/models/Dtos/IRegisterDto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerDto: IRegisterDto = {
    Username: '',
    Email: '',
    Password: ''
  }
  constructor(private authService: AuthService,) { }

  ngOnInit() {
  }

  registerAction(){
    console.log(this.registerDto);
    this.authService.register(this.registerDto);
  }
}
