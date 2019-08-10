import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  loginButton(email: string, password: string){
    this.authService.login(email, password).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/todo']);
      }
      console.log(response);
      
    });
  }

}
