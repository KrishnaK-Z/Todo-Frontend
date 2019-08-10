import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Thing } from 'src/app/models/thing.model';
import { Todo } from 'src/app/models/todo.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private webRequestService: WebRequestService
  ) { }

  createTodo(title: string){
    return this.webRequestService.post('todo', {title});
  }

  getTodos(){
    return this.webRequestService.get('todo');
  }

  deleteTodo(todoId: string){
    return this.webRequestService.delete(`todo/${todoId}`);
  }

  updateList(todoId: string, title: string){
    return this.webRequestService.patch(`todo/${todoId}`, {title});
  }

  getThings(todoId: string){
    return this.webRequestService.get(`todo/${todoId}/things`);
  }

  createThing(todoId: string, thing: string){
    return this.webRequestService.post(`todo/${todoId}/things`, {thing});
  }

  deleteThing(todoId:string, thingId: string){
    return this.webRequestService.delete(`todo/${todoId}/things/${thingId}`);
  }

  complete(thing: Thing){
    return this.webRequestService.patch(`todo/${thing._todoId}/things/${thing._id}`, {
      completed: !thing.completed
    });
  }

  updateThing(todoId: string, thingId: string, thing: string){
    return this.webRequestService.patch(`todo/${todoId}/things/${thingId}`, {
      thing
    });
  }

}
