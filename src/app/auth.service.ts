import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private webRequestService: WebRequestService,
    private route: Router
  ) { }

  login(email: string, password: string){
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap( (response: HttpResponse<any>) =>{
        // the auth tokens will be in the header of this response
        this.setSession(response.body._id, response.headers.get('x-access-token'), response.headers.get('x-refresh-token'));
        console.log("Logged In");
        console.log(response);
      } )
    )
  }

  signup(email: string, password: string) {
    return this.webRequestService.signup(email, password).pipe(
      shareReplay(),
      tap((response: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(response.body._id, response.headers.get('x-access-token'), response.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  logout(){
    this.removeSession();
    this.route.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession = (userId: string, accessToken: string, refreshToken: string) => {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession = () => {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken(){
    return this.http.get(`${this.webRequestService.ROOT_URL}/me/access-token`,{
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap( (response: HttpResponse<any>) => {
        this.setAccessToken(response.headers.get('x-access-token'));
      } )
    )
  }

}