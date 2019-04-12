import { Component, OnInit } from '@angular/core';
import {MoviesListService} from '../../services/movies-list.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
