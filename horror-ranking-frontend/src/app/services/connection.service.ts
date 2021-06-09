import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  APIURL: string = "http://localhost:3000/posts/";
  BASEURL: string = "http://localhost:3000";
  moviesData$: Observable<Movie[]>;
  moviesData: any;
  movieData$: Observable<Movie>;
  movieData: any;
  moviesDataUpdated: boolean = false;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.APIURL);
  }

  getMovie(apiurl: string) {
    return this.http.get<Movie>(apiurl);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.APIURL, movie);
  }

  deleteMovie(movieName: string) {
    return this.http.delete<Movie>(this.APIURL + movieName);
  }

  updateMovie(movie: Movie) {
    return this.http.patch(this.APIURL + movie.name, movie);
  }

  findByName(url: string, name: string): Observable<Movie> {
    return this.http.get<Movie>(url + name);
  }

  loadMoviesCache() {
    this.moviesData$ = this.getMovies().pipe(
      shareReplay(1)
    );
    this.moviesData$
      .subscribe(
        data => {
          this.moviesData = data,
            setInterval(() => { this.loadMoviesCache() }, 300000) //Cache will be loaded automatically every 3 minutes
        },
        error => (err => {
          throwError(err);
        }));
    return this.moviesData;
  }

  loadMovieCache(url: string, name: string) {
    this.movieData$ = this.findByName(url, name).pipe(
      shareReplay(1)
    );
    this.movieData$
      .subscribe(
        data => {
          this.movieData = data
        },
        error => (err => {
          throwError(err);
        }));
    return this.movieData;
  }

  login(email: string, password: string) {
    return this.http.post(`${this.BASEURL}/users/login`, {
      email: email,
      password: password,
    }, {
      observe: 'response'
    });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.BASEURL}/users`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }
}
