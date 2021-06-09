import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  name: string;
  editMode = false;
  movieForm: FormGroup;
  movieData: any;

  constructor(private router: Router, private route: ActivatedRoute, private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.name = params['name'];
        this.editMode = params['name'] != "new";
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.connectionService.updateMovie(this.movieForm.value).subscribe(data => {
        this.connectionService.moviesDataUpdated = true;
      });

    } else {
      this.connectionService.addMovie(this.movieForm.value).subscribe(data => {
        this.connectionService.moviesDataUpdated = true;
      })
    }
    setInterval(() => {this.onCancel();}, 500);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private initForm() {

    let name = '';
    let description = '';
    let releaseDate = '';
    let length = '';
    let imbdRating = '';
    let suspense = '';
    let gore = '';
    let spookiness = '';
    let imageURL = '';

    if (this.editMode) {
      this.connectionService.moviesData.forEach(movie => {
        if (movie.name == this.name) {
          this.movieData = movie;
        }
      });
      if (this.editMode) {
        name = this.movieData.name;
        description = this.movieData.description;
        releaseDate = this.movieData.releaseDate;
        length = this.movieData.length;
        imbdRating = this.movieData.imbdRating;
        suspense = this.movieData.suspense;
        gore = this.movieData.gore;
        spookiness = this.movieData.spookiness;
        imageURL = this.movieData.imageURL;
      }
    }
    this.movieForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      releaseDate: new FormControl(releaseDate, Validators.required),
      length: new FormControl(length, Validators.required),
      imbdRating: new FormControl(imbdRating, Validators.required),
      suspense: new FormControl(suspense, Validators.required),
      gore: new FormControl(gore, Validators.required),
      spookiness: new FormControl(spookiness, Validators.required),
      imageURL: new FormControl(imageURL, Validators.required),
    })

  }


}
