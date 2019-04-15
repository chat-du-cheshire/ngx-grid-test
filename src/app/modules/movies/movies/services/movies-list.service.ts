import {Injectable} from '@angular/core';

import {environment} from '../../../../../environments/environment';
import {IMovie} from '../interfaces/IMovie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';
import {xor, isArray, omit} from 'lodash';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

function getHttpParamsFromObject(value: any): HttpParams {
  return new HttpParams({fromObject: value});
}

@Injectable()
export class MoviesListService {
  isLoading = false;
  itemHeight = 48;
  headerHeight = 48;
  private _currentPage = 1;
  private _itemsPerPage = 50;

  url = `${environment.api}/movies`;

  items: IMovie[] = null;
  items$ = new BehaviorSubject<IMovie[]>(this.items);

  protected handleScroll: (...args: any[]) => void;

  private _prevSelected = null;

  selectedItem: IMovie = null;
  selectedItem$ = new BehaviorSubject<IMovie>(this.selectedItem);

  checkedItems: IMovie[] = [];
  checkedItems$ = new BehaviorSubject<IMovie[]>(this.checkedItems);

  filterParams = {};


  get requestParams() {
    return Object.assign({}, this.defaultRequestParams, this.filterParams);
  }

  constructor(private http: HttpClient, protected route: ActivatedRoute) {
    this.subscribeRouteData();
  }

  private subscribeRouteData() {
    this.route.data.pipe(take(1)).subscribe(({data}) => {
      const [movies] = data;
      this._currentPage++;
      this.setItems(movies);
    });
  }

  /**
   * Установка обработчка прокрутки
   * @param fn - функция обработчик
   */
  setScrollHandler(fn: (...args: any[]) => void) {
    this.handleScroll = fn;
  }

  /**
   * Запрос данных на сервер
   */
  makeRequest() {
    const params = getHttpParamsFromObject(this.requestParams);
    this.isLoading = true;
    return this.http.get<IMovie[]>(this.url, {params});
  }

  /**
   * Параметры запроса на сервер
   */
  get defaultRequestParams() {
    return {
      _page: String(this._currentPage++),
      _limit: String(this._itemsPerPage)
    };
  }

  search(value: string, fields: string | string[]) {
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
    this.subscribeRequest((items) => {
      this.handleScroll(0);
      this.setItems(items);
    });
  }

  /**
   * Перезапрашиваем данные с сервера
   */
  reload() {
    this._currentPage = 1;
    this.subscribeRequest((items) => {
      this.handleScroll(0);
      this.setItems(items);
    });
  }

  /**
   * Отправка запроса на сервер и подписка на него
   * @param fn - функция обработки подписки
   */
  protected subscribeRequest(fn: (items: IMovie[]) => void) {
    this.makeRequest()
      .pipe(take(1))
      .subscribe(fn);
  }

  /**
   * Метод для использования в Router Resolve. Осуществляет инициализацию списка после того как данные получены с сервера
   */
  resolve() {
    return this.makeRequest()
      .pipe(tap((items) => this.setItems(items)));
  }

  /**
   * Обработчик события прокрутки списка
   * @param $event - событие генерируемое таблицей
   * @param wrap - обертка таблицы, для расчета высоты
   */
  onScroll($event, wrap) {
    const offsetY = $event.offsetY;
    const itemsLength = (this.items || []).length;
    const itemHeight = this.itemHeight;
    // total height of all rows in the viewport
    const viewHeight = wrap.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= itemsLength * itemHeight) {
      this.subscribeRequest((items) => {
        this.setItems([...this.items, ...items]);
      });
    }
  }

  onActivate($event) {
    switch ($event.type) {
      case 'click': {
        this.selectItem($event.row);
        if ($event.event.ctrlKey) {
          this.toggleCheckedItem($event.row);
        }
        if ($event.event.shiftKey && this._prevSelected) {
          const selected = this.items.indexOf($event.row);
          const prev = this.items.indexOf(this._prevSelected);

          this.checkedItems = this.items.slice(Math.min(selected, prev), Math.max(selected, prev) + 1);
        }
        break;
      }
      case 'dblclick': {
        this.toggleCheckedItem($event.row);
        break;
      }
    }
  }

  selectItem(item) {
    this._prevSelected = this.selectedItem;
    this.selectedItem = item;
    this.selectedItem$.next(this.selectedItem);
  }

  toggleCheckedItem(item) {
    this.checkedItems = xor(this.checkedItems, [item]);
    this.checkedItems$.next(this.checkedItems);
  }

  /**
   * Функция обновления списка
   * @param items - новый массив элементов
   */
  setItems(items: IMovie[]) {
    this.isLoading = false;
    this.items = items;
    this.items$.next(this.items);
    if (!this.selectedItem) {
      this.selectItem(items[0]);
    }
  }

  updateFilterParams(params: any) {
    this.filterParams = {...this.filterParams, ...params};
  }

  get rowClass() {
    const rowClass = (row) => {
      const isSelected = this.selectedItem.id === row.id;
      const isChecked = Boolean(this.checkedItems && this.checkedItems.find(checkedRow => checkedRow.id === row.id));
      return {
        'row-selected': isSelected,
        'row-checked': isChecked
      };
    };

    return rowClass;
  }
}
