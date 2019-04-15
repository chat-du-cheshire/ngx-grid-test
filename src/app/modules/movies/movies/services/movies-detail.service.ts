import { Injectable } from '@angular/core';
import {MoviesService} from './movies.service';
import {IMovie} from '../interfaces/IMovie';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Injectable()
export class MoviesDetailService {
  item: IMovie = null;

  constructor(protected movie: MoviesService, protected route: ActivatedRoute) {
    this.subscribeRouteData();
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
