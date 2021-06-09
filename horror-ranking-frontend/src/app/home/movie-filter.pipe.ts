import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/Movie';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies: Movie[], searchTerm: string ): Movie[] {
    if(!movies || !searchTerm){
      return movies;
    }
    return movies.filter(movie => movie.name.toLowerCase()
      .indexOf(searchTerm.toLowerCase())!== -1);
  }
}
