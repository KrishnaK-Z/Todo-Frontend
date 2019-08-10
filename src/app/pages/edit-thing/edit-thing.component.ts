import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-edit-thing',
  templateUrl: './edit-thing.component.html',
  styleUrls: ['./edit-thing.component.scss']
})
export class EditThingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private todoService: TodoService, 
    private router: Router
  ) { }

  todoId: string;
  thingId: string;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.todoId = params.todoId;
        this.thingId = params.thingId;
      }
    )
  }

  updateThing(title: string) {
    this.todoService.updateThing(this.todoId, this.thingId, title).subscribe(() => {
      this.router.navigate(['/todo', this.todoId]);
    })
  }

}
