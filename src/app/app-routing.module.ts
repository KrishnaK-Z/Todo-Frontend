import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoViewComponent} from './pages/todo-view/todo-view.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { NewThingComponent } from './pages/new-thing/new-thing.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { EditThingComponent } from './pages/edit-thing/edit-thing.component';

const routes: Routes = [
  {path: '', redirectTo: '/todo', pathMatch: 'full'},
  {path: 'new-todo', component: NewTodoComponent},
  {path: 'todo/:todoId', component: TodoViewComponent},
  {path: 'todo', component: TodoViewComponent},
  {path: 'todo/:todoId/new-thing', component: NewThingComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'edit-todo/:todoId', component: EditTodoComponent},
  {path: 'todo/:todoId/edit-thing/:thingId', component: EditThingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
