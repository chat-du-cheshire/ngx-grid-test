import {Component, OnInit} from '@angular/core';
import {MoviesListService} from '../../services/movies-list.service';

@Component({
  selector: 'app-movies-ag-grid',
  templateUrl: './movies-ag-grid.component.html',
  styleUrls: ['./movies-ag-grid.component.scss'],
  providers: [MoviesListService]
})
export class MoviesAgGridComponent implements OnInit {
  agColumns = [
    {headerName: 'Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Watched', field: 'watched'}
  ];

  constructor(public list: MoviesListService) {
  }

  ngOnInit() {
  }

  onGridReady($event) {
    $event.api.sizeColumnsToFit();
  }

  onBodyScroll($event) {
    console.log($event);
  }
}
