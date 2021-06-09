import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { Ngxalert } from 'ngx-dialogs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myData: any;
  deleteAlert: any = new Ngxalert;
  filter = new FormControl('');
  APIURL: string = "http://localhost:3000/posts/";
  currentRate = 0;
  dataFound: boolean = true;
  searchTerm: string;
  movieFilter: any = { name: ""};
  accessToken: string = null;
  unloadedData:boolean = false;
  spookinessToggled: boolean = false;
  goreToggled: boolean = false;
  suspenseToggled: boolean = false;


  headers = ['Name', 'Description', 'Release Date', 'Length', 'imdbRating', 'suspense', 'Gore', 'Spookiness', 'ImageURL'];

  constructor(private connectionService: ConnectionService, private router: Router, private route: ActivatedRoute) {
    if (this.connectionService.moviesDataUpdated){
      this.unloadedData = true;
    }
    if (!this.connectionService.moviesData) {
      this.connectionService.loadMoviesCache()
      this.connectionService.moviesData$.subscribe(
        data => {
          this.myData = data
          this.myData.sort((a, b) => (a.imbdRating < b.imbdRating) ? 1 : ((b.imbdRating < a.imbdRating) ? -1 : 0))
        });
    } else {
      this.myData = this.connectionService.moviesData;
    }
    if (localStorage.getItem("x-access-token") !== null) {
      this.accessToken = localStorage.getItem("x-access-token");
    }
  }

  toggleGore(event){
    if(event.target.checked) {
      this.goreToggled = true;
      this.sort();
    } else {
      this.goreToggled = false;
      this.sort();
    }
  }
  toggleSpookiness(event){
    if(event.target.checked) {
      this.spookinessToggled = true;
      this.sort();
    } else {
      this.spookinessToggled = false;
      this.sort();
    }
  }
  toggleSuspense(event){
    if(event.target.checked) {
      this.suspenseToggled = true;
      this.sort();
    } else {
      this.suspenseToggled = false;
      this.sort();
    }
  }

  ngOnInit(): void {
  }

  sort() {
    if (this.goreToggled && !this.suspenseToggled && !this.spookinessToggled) {
      this.myData.sort((a, b) => (a.gore < b.gore) ? 1 : ((b.gore < a.gore) ? -1 : 0))
    } else if (!this.goreToggled && this.suspenseToggled && !this.spookinessToggled) {
      this.myData.sort((a, b) => (a.suspense < b.suspense) ? 1 : ((b.suspense < a.suspense) ? -1 : 0))
    } else if (!this.goreToggled && !this.suspenseToggled && this.spookinessToggled) {
      this.myData.sort((a, b) => (a.spookiness < b.spookiness) ? 1 : ((b.spookiness < a.spookiness) ? -1 : 0))
    } else if(!this.goreToggled && this.suspenseToggled && this.spookinessToggled){
      this.myData.sort((a, b) => ((a.spookiness+a.suspense)/2 < (b.spookiness+b.suspense)/2) ? 1 : (((b.spookiness+b.suspense)/2 < (a.spookiness+a.suspense)/2) ? -1 : 0))
    } else if(this.goreToggled && this.suspenseToggled && !this.spookinessToggled){
      this.myData.sort((a, b) => ((a.gore+a.suspense)/2 < (b.gore+b.suspense)/2) ? 1 : (((b.gore+b.suspense)/2 < (a.gore+a.suspense)/2) ? -1 : 0))
    } else if(this.goreToggled && !this.suspenseToggled && this.spookinessToggled){
      this.myData.sort((a, b) => ((a.gore+a.spookiness)/2 < (b.gore+b.spookiness)/2) ? 1 : (((b.gore+b.spookiness)/2 < (a.gore+a.spookiness)/2) ? -1 : 0))
    } else if(this.goreToggled && this.suspenseToggled && this.spookinessToggled) {
      this.myData.sort((a, b) => ((a.gore+a.spookiness+a.suspense)/3 < (b.gore+b.spookiness+b.suspense)/3) ? 1 : (((b.gore+b.suspense+b.spookiness)/3 < (a.gore+a.suspense+a.spookiness)/3) ? -1 : 0))
    } else {
      this.myData.sort((a, b) => (a.imbdRating < b.imbdRating) ? 1 : ((b.imbdRating < a.imbdRating) ? -1 : 0))
    }
  }

  openPost(movie: Movie) {
    this.router.navigate(['/movie', movie.name]);
    this.connectionService.loadMovieCache(this.APIURL, movie.name);
  }

  addMovie() {
    this.router.navigate(['/movie/edit', "new"]);
  }

  editPost(movie: Movie) {
    this.router.navigate(['/movie/edit', movie.name]);
  }

  deletePost(movie: Movie) {
    this.deleteAlert.create({
      title: 'Deleting a movie',
      message: 'Are you sure you want to delete this movie?',
      buttons: [
        {
          title: 'Yes',
          class: 'yes-btn',
          event: () => {
            this.connectionService.deleteMovie(movie.name).subscribe();
            location.reload();
          }
        },
        {
          title: 'No',
          class: 'no-btn',
          event: () => {
            location.reload()
          }
        }
      ]
    })
  }
}