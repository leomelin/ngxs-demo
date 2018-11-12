import { Component, OnInit } from '@angular/core';
import { Col } from './models/col';
import { Select, Store } from '@ngxs/store';
import { GetUsers, SaveUser } from './store/users/users.actions';
import { User } from './models/user';
import { Observable } from 'rxjs/index';
import { UsersState } from './store/users/users.state';
import { ModifyEvent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  cols: Col[] = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Email',
      key: 'email'
    },
    {
      label: 'Phone',
      key: 'phone'
    }
  ];

  @Select(UsersState.users)
  users$: Observable<User[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }

  saveUser(e: ModifyEvent) {
    this.store.dispatch(new SaveUser(e.row));
  }
}
