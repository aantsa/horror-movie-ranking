import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { MovieComponent } from './movie/movie.component';

import { RouterModule } from '@angular/router';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { NgxDialogsModule } from 'ngx-dialogs';
import { MovieFilterPipe } from './home/movie-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    MovieComponent,
    MovieEditComponent,
    MovieFilterPipe,
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    NgxDialogsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
