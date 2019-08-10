import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '../../models/response.model'
import { Thing } from '../../models/thing.model';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {

  todos: Todo[];
  things: Thing[];

  selectedTab: number = 1;

  selectedTodo: string;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.todoId)
        {
          this.selectedTodo = params.todoId;
          this.todoService.getThings(params.todoId).subscribe( (response: Response) => {
            if(response.success){
              this.things = response.result;
            }
          } );
        }
        else{
          this.things = undefined;
        }
      }
    );

    this.todoService.getTodos().subscribe( (response: Response) => {
      if(response.success){
        this.todos = response.result;
      }
    } );

  }

  onClickThing(thing: Thing){
      this.todoService.complete(thing).subscribe( (response: Response) => {
          if(response.success)
          {
            thing.completed = !thing.completed;
          }
      },
      error => {
        console.log("Error in updating", error);
      } );
  }

  onDeleteTodo(){
    this.todoService.deleteTodo(this.selectedTodo).subscribe(response => {
      this.router.navigate(['/todo']);
    });
  }

  onDeleteThing(thingId: string){
    this.todoService.deleteThing(this.selectedTodo, thingId).subscribe((response: any) => {
      this.things = this.things.filter(thing => thing._id !== thingId);
    });
  }

  selectTab(){
    if(this.selectedTab === 1)
    {
      this.selectedTab = 2;
    }
    else
    {
      this.selectedTab = 1;
    }
  }

}