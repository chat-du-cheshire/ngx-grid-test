import {Injectable} from '@angular/core';

import {environment} from '../../../../../environments/environment';
import {IMovie} from '../interfaces/IMovie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';


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
  protected handleScroll: (...args: any[]) => void;

  constructor(private http: HttpClient) {
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
    const params = this.getRequestParams();
    this.isLoading = true;
    return this.http.get<IMovie[]>(this.url, {params});
  }

  /**
   * Параметры запроса на сервер
   */
  getRequestParams(): HttpParams {
    let params = new HttpParams();
    params = params.set('_page', String(this._currentPage++));
    params = params.set('_limit', String(this._itemsPerPage));
    return params;
  }

  /**
   * Принудительная загрузка данных с сервера
   */
  load() {
    this.subscribeRequest((items) => {
      this.setItems(items);
      this.handleScroll(0);
    });
  }

  /**
   * Перезапрашиваем данные с сервера
   */
  reload() {
    this._currentPage = 1;
    this.load();
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

  /**
   * Функция обновления списка
   * @param items - новый массив элементов
   */
  setItems(items: IMovie[]) {
    this.isLoading = false;
    this.items = items;
  }
}
