import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IDatasource, IGetRowsParams} from 'ag-grid-community';
import {environment} from '../../../../../../../environments/environment';
import {IMovie} from '../../../interfaces/IMovie';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';

function getHttpParamsFromObject(value: any): HttpParams {
  return new HttpParams({fromObject: value});
}

@Injectable({
  providedIn: 'root'
})
export class AgMoviesListService implements IDatasource {

  private _currentPage = 1;
  private _itemsPerPage = 50;

  itemHeight = 48;
  headerHeight = 48;

  get itemsPerPage() {
    return this._itemsPerPage;
  }

  url = `${environment.api}/movies`;

  items: IMovie[] = [];
  items$ = new BehaviorSubject<IMovie[]>(this.items);

  filterParams = {};

  isLoading = false;

  get defaultRequestParams() {
    return {
      _page: String(this._currentPage++),
      _limit: String(this._itemsPerPage)
    };
  }

  get requestParams() {
    return Object.assign({}, this.defaultRequestParams, this.filterParams);
  }


  constructor(private http: HttpClient) {
  }

  makeRequest() {
    const params = getHttpParamsFromObject(this.requestParams);
    this.isLoading = true;
    return this.http.get<IMovie[]>(this.url, {params});
  }

  getRows(params: IGetRowsParams): void {
    console.log(params);
    this.subscribeRequest((items) => {
      params.successCallback(items, params.endRow > 1000 ? 1000 : undefined);
    });
  }

  protected subscribeRequest(fn: (items: IMovie[]) => void) {
    this.makeRequest()
      .pipe(take(1))
      .subscribe(fn);
  }

  setItems(items: IMovie[]) {
    this.isLoading = false;
    this.items = items;
    this.items$.next(this.items);
  }
}
