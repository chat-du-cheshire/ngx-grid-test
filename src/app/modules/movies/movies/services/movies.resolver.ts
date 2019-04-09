import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IMovie} from '../interfaces/IMovie';
import {MoviesListService} from './movies-list.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MoviesResolver implements Resolve<Observable<IMovie[]>> {
  constructor(private list: MoviesListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovie[]> {
    return this.list.resolve();
  }
}
