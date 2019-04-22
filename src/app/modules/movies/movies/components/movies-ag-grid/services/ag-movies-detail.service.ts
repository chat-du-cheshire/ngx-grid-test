import { Injectable } from '@angular/core';
import {IMovie} from '../../../interfaces/IMovie';
import {MoviesService} from '../../../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgMoviesDetailService {
  item: IMovie = null;

  constructor(protected movie: MoviesService, protected route: ActivatedRoute) {
    // this.subscribeRouteData();
  }

  private subscribeRouteData() {
    this.route.data.pipe(take(1)).subscribe(({data}) => {
      this.setItem(data[1]);
    });
  }

  setItem(item: IMovie) {
    this.item = item;
  }

  getDetails(item: IMovie): Observable<IMovie> {
    return this.movie.get(item.id);
  }

  requestDetails(item: IMovie) {
    this.getDetails(item)
      .pipe(take(1))
      .subscribe((resp) => this.setItem(resp));
  }
}
