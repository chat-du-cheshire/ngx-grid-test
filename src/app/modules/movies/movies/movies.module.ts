import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesPageComponent} from './components/movies-page/movies-page.component';
import {Route, RouterModule} from '@angular/router';
import {MoviesAgGridComponent} from './components/movies-ag-grid/movies-ag-grid.component';
import {MoviesNgxDatatableComponent} from './components/movies-ngx-datatable/movies-ngx-datatable.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';

const moviesRoutes: Route[] = [{
  path: 'movies',
  component: MoviesPageComponent,
  children: [{
    path: 'ag-grid',
    component: MoviesAgGridComponent
  }, {
    path: 'ngx-datatable',
    component: MoviesNgxDatatableComponent
  }]
}];

@NgModule({
  declarations: [MoviesPageComponent, MoviesAgGridComponent, MoviesNgxDatatableComponent],
  imports: [
    HttpClientModule,
    NgxDatatableModule,
    CommonModule,
    RouterModule.forChild(moviesRoutes)
  ]
})
export class MoviesModule {
}
