import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TodoService } from 'src/app/todo.service';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor(
    private location: Location,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack(): void{
    this.location.back();
  }

  createNewTodo(todo: string){
    this.todoService.createTodo(todo)
    .subscribe((response: Response)=>{
      if(!response.success)
      {
        alert("Error in Creating a New Todo");
      }
      const todo: Todo = response.result;
      this.router.navigate(['/todo', todo._id]);
    });
  }

}
