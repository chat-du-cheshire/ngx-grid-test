import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MoviesStateService} from '../../services/movies-state.service';
import {MoviesListService} from '../../services/movies-list.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-movies-ngx-datatable',
  templateUrl: './movies-ngx-datatable.component.html',
  styleUrls: ['./movies-ngx-datatable.component.scss']
})
export class MoviesNgxDatatableComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public state: MoviesStateService,
              public list: MoviesListService,
              public el: ElementRef) { }

  ngOnInit() {
    // this.list.load();
    this.list.setScrollHandler(this.getScrollToFn());
  }

  getScrollToFn() {
    return (index: number) => {
      if (this.table && this.table.bodyComponent.scroller) {
        this.table.bodyComponent.scroller.setOffset(index);
      }
    };
  }
}
