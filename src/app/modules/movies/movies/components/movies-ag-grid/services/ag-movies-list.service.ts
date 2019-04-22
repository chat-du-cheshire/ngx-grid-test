import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GridApi, IDatasource, IGetRowsParams} from 'ag-grid-community';
import {environment} from '../../../../../../../environments/environment';
import {IMovie} from '../../../interfaces/IMovie';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {isArray, omit} from 'lodash';

function getHttpParamsFromObject(value: any): HttpParams {
  return new HttpParams({fromObject: value});
}

@Injectable({
  providedIn: 'root'
})
export class AgMoviesListService implements IDatasource {

  selectedItem = null;
  private _selectedItem$ = new BehaviorSubject(this.selectedItem);
  selectedItem$ = this._selectedItem$.asObservable();

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

  gridApi: GridApi = null;

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

  onSearch(value: string, fields: string | string[]) {
    console.log(value);
    this.filter(value, fields);
  }

  private filter(value: any, fields: string | string[]) {
    this._currentPage = 1;
    let filterParams = this.filterParams;
    if (typeof fields === 'string') {
      filterParams = value ? {[fields + '_like']: value} : delete filterParams[fields + '_like'];
    }

    if (isArray(fields)) {
      const reducer = value
        ? (a, k) => ({...a, [k]: value})
        : (a, k) => omit(a, [k]);

      filterParams = (fields as string[]).reduce(reducer, value ? {} : filterParams);
    }

    this.updateFilterParams(filterParams);
    this.gridApi.onFilterChanged();
  }

  onFilter(value: boolean, fields: string | string[]) {
    console.log(value);
    this.filter(value, fields);
  }

  updateFilterParams(params: any) {
    this.filterParams = {...this.filterParams, ...params};
  }

  isFilterPresent() {
    return true;
  }

  isFilterPass(node) {
    console.log(node);
    return true;
  }

  onGridReady($event) {
    console.log($event);
    this.gridApi = $event.api;
  }

  onSelected($event) {
    console.log('Selected', $event);
  }

  onSelectionChanged($event) {
    console.log('Selection Changed', $event);

    console.log('Selected rows', $event.api.getSelectedRows());
  }

  onClicked($event) {
    console.log('Row clicked', $event);
    this.selectItem($event.data);
  }

  selectItem(item) {
    this.selectedItem = item;
    this._selectedItem$.next(this.selectedItem);
  }

}
