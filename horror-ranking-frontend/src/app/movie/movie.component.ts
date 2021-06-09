import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieObject: Movie;
  APIURL: string = "http://localhost:3000/posts/";
  myData: any;
  movieName: any;
  constructor(private connectionService: ConnectionService, private activatedRoute: ActivatedRoute) {

    this.movieName = this.activatedRoute.snapshot.paramMap.get('name');

    this.connectionService.moviesData.forEach(movie => {
      if (movie.name == this.movieName) {
        this.myData = movie;
      }
    });
  }

  ngOnInit(): void {
  }
}
