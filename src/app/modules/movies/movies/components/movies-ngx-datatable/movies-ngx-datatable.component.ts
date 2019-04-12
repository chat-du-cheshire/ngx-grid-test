import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MoviesStateService} from '../../services/movies-state.service';
import {MoviesListService} from '../../services/movies-list.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-movies-ngx-datatable',
  templateUrl: './movies-ngx-datatable.component.html',
  styleUrls: ['./movies-ngx-datatable.component.scss']
})
export class MoviesNgxDatatableComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('watchedTpl') watchedTpl: TemplateRef<any>;

  ngxColumns;

  constructor(public list: MoviesListService,
              public el: ElementRef) {
  }

  ngOnInit() {
    this.ngxColumns = [
      {prop: 'title', name: 'Title'},
      {prop: 'watched', name: 'Watched', cellTemplate: this.watchedTpl}
    ];
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
