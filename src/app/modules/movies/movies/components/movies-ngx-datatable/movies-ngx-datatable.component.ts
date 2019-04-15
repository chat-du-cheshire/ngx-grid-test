import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MoviesListService} from '../../services/movies-list.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {MoviesDetailService} from '../../services/movies-detail.service';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-movies-ngx-datatable',
  templateUrl: './movies-ngx-datatable.component.html',
  styleUrls: ['./movies-ngx-datatable.component.scss'],
  providers: [MoviesListService, MoviesDetailService]
})
export class MoviesNgxDatatableComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('watchedTpl') watchedTpl: TemplateRef<any>;

  ngxColumns;

  constructor(public list: MoviesListService,
              public detail: MoviesDetailService,
              public el: ElementRef) {
  }

  ngOnInit() {
    this.ngxColumns = [
      {prop: 'title', name: 'Title'},
      {prop: 'watched', name: 'Watched', cellTemplate: this.watchedTpl}
    ];

    this.list.setScrollHandler(this.getScrollToFn());

    this.list.selectedItem$.pipe(
        skip(1) // Cause we've already resolved detail in route resolver
      ).subscribe((item) => this.detail.requestDetails(item));
  }

  getScrollToFn() {
    return (index: number) => {
      if (this.table && this.table.bodyComponent.scroller) {
        this.table.bodyComponent.scroller.setOffset(index);
      }
    };
  }
}
