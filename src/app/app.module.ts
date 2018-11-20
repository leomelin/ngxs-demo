import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/users/users.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxsModule.forRoot([UsersState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
