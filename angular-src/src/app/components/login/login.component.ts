import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService, 
    private flashMessages: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    if(!this.validateService.validateAuthen(user)){
      this.flashMessages.show('Plese fill in all fields', {cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.authenUser(user).subscribe( data => {
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessages.show('Login Success', {cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
