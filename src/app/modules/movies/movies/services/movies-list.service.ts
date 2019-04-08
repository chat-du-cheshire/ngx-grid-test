import {Injectable} from '@angular/core';

import {environment} from '../../../../../environments/environment';
import {IMovie} from '../interfaces/IMovie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  isLoading = false;
  itemHeight = 48;
  headerHeight = 48;
  private _currentPage = 1;
  private _itemsPerPage = 50;
  url = `${environment.api}/movies`;

  items: IMovie[] = null;

  constructor(private http: HttpClient) {
  }

  makeRequest(isRefresh = false) {
    const params = this.getRequestParams();
    this.isLoading = true;
    this.http.get<IMovie[]>(this.url, {params})
      .pipe(take(1))
      .subscribe((items) => {
        this.isLoading = false;
        this.items = this.items && !isRefresh ? [...this.items, ...items] : items;
      });
  }

  getRequestParams(): HttpParams {
    let params = new HttpParams();
    params = params.set('_page', String(this._currentPage++));
    params = params.set('_limit', String(this._itemsPerPage));
    return params;
  }

  reload() {
    this._currentPage = 1;
    this.makeRequest(true);
  }

  onScroll($event, wrap) {
    const offsetY = $event.offsetY;
    const itemsLength = (this.items || []).length;
    const itemHeight = this.itemHeight;
    // total height of all rows in the viewport
    const viewHeight = wrap.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= itemsLength * itemHeight) {
      this.makeRequest();
    }
  }
}
