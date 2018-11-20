import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/users/users.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FormsModule } from '@angular/forms';
import { SpinnerState } from './store/spinner/spinner.state';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    NgxLoadingModule.forRoot({}),
    NgxsModule.forRoot([UsersState, SpinnerState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
