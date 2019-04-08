import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesStateService {
  ngxColumns = [
    {prop: 'title', name: 'Title'},
    {prop: 'watched', name: 'Watched'}
  ];
}
