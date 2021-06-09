import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:name', component: MovieComponent },
  { path: 'movie/edit/:name', component: MovieEditComponent },
  { path: 'movie/edit', component: MovieEditComponent },
  { path: 'auth', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
