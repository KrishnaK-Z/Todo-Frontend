import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TodoService } from 'src/app/todo.service';
import { Thing } from 'src/app/models/thing.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-new-thing',
  templateUrl: './new-thing.component.html',
  styleUrls: ['./new-thing.component.scss']
})
export class NewThingComponent implements OnInit {

  todoId: string;

  constructor(
    private location: Location,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.todoId = params['todoId'];
      }
    );
  }

  createNewThing(thing: string){
    this.todoService.createThing(this.todoId, thing).subscribe(
      (response: Response) => {
        
        if(response && response.success){
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }
    );
  }

  goBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
