import {Component, OnInit} from '@angular/core';
import {MoviesListService} from '../../services/movies-list.service';
import {AgMoviesListService} from './services/ag-movies-list.service';
import {MoviesDetailService} from '../../services/movies-detail.service';
import {filter, switchMap} from 'rxjs/operators';
import {AgMoviesDetailService} from './services/ag-movies-detail.service';
import {StatusComponent} from '../status/status.component';

@Component({
  selector: 'app-movies-ag-grid',
  templateUrl: './movies-ag-grid.component.html',
  styleUrls: ['./movies-ag-grid.component.scss'],
  providers: [AgMoviesListService, AgMoviesDetailService]
})
export class MoviesAgGridComponent implements OnInit {
  agColumns = [
    {headerName: 'Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Watched', field: 'watched', width: 100, cellRendererFramework: StatusComponent, colId: 'watched'}
  ];

  constructor(public list: AgMoviesListService, public detail: AgMoviesDetailService) {
  }

  ngOnInit() {
    this.list.selectedItem$.pipe(filter(item => !!item)).subscribe(item => this.detail.requestDetails(item));
  }

  onGridReady($event) {
    // $event.api.sizeColumnsToFit();
  }

  onBodyScroll($event) {
    console.log($event);
  }
}
