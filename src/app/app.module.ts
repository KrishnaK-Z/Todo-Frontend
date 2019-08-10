import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatTabsModule } from '@angular/material';

import { TodoViewComponent } from './pages/todo-view/todo-view.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { NewThingComponent } from './pages/new-thing/new-thing.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WebReqInterceptor } from './web-req.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { EditThingComponent } from './pages/edit-thing/edit-thing.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    NewTodoComponent,
    NewThingComponent,
    LoginPageComponent,
    SignupComponent,
    EditTodoComponent,
    EditThingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: WebReqInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
