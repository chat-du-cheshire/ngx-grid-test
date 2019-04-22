import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesPageComponent} from './components/movies-page/movies-page.component';
import {Route, RouterModule} from '@angular/router';
import {MoviesAgGridComponent} from './components/movies-ag-grid/movies-ag-grid.component';
import {MoviesNgxDatatableComponent} from './components/movies-ngx-datatable/movies-ngx-datatable.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';
import {MoviesResolver} from './services/movies.resolver';
import { StatusComponent } from './components/status/status.component';
import {MoviesListService} from './services/movies-list.service';
import {AgGridModule} from 'ag-grid-angular';

const moviesRoutes: Route[] = [{
  path: 'movies',
  component: MoviesPageComponent,
  children: [{
    path: 'ag-grid',
    component: MoviesAgGridComponent
  }, {
    path: 'ngx-datatable',
    component: MoviesNgxDatatableComponent,
    resolve: {
      data: MoviesResolver
    }
  }]
}];

@NgModule({
  declarations: [MoviesPageComponent, MoviesAgGridComponent, MoviesNgxDatatableComponent, StatusComponent],
  imports: [
    HttpClientModule,
    NgxDatatableModule,
    CommonModule,
    AgGridModule.withComponents([StatusComponent]),
    RouterModule.forChild(moviesRoutes)
  ]
})
export class MoviesModule {
}
