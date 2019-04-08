import {Component, ElementRef, OnInit} from '@angular/core';
import {MoviesStateService} from '../../services/movies-state.service';
import {MoviesListService} from '../../services/movies-list.service';

@Component({
  selector: 'app-movies-ngx-datatable',
  templateUrl: './movies-ngx-datatable.component.html',
  styleUrls: ['./movies-ngx-datatable.component.scss']
})
export class MoviesNgxDatatableComponent implements OnInit {

  constructor(public state: MoviesStateService,
              public list: MoviesListService,
              public el: ElementRef) { }

  ngOnInit() {
    this.list.makeRequest();
  }

}
