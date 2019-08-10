import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    request =this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        console.log(error);

        if(error.status === 401){
          // we are unauthorized

          //refresh the access token
          return this.refreshAccessToken().pipe(
            switchMap( () => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            } ),
            catchError( (error: any) => {
              console.error(error);
              this.authService.logout();
              return empty();
            } )
          )
        }

        return throwError(error);
      } )
    )
  }

  /**
   * To refresh the access token
   */
  refreshAccessToken() {
    if(this.refreshingAccessToken)
    {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    }
    else{
      this.refreshingAccessToken = true;

      return this.authService.getNewAccessToken().pipe(
        tap( ()=> {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        } )
      )
    }
  }


  /**
   * Add the access token to each headers
   */
  addAuthHeader(request: HttpRequest<any>){
    // get the access token
    const token = this.authService.getAccessToken();

    // append the access token to the request header
    if(token){
      return request.clone( {
        setHeaders: {
          'x-access-token': token
        }
      } )
    }
    return request;
  }
}
