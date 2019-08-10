import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todoId: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.todoId = params.todoId;
      }
    )
  }

  updateList(title: string) {
    this.todoService.updateList(this.todoId, title).subscribe(() => {
      this.router.navigate(['/todo', this.todoId]);
    })
  }

}
