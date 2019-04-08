import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesAgGridComponent } from './movies-ag-grid.component';

describe('MoviesAgGridComponent', () => {
  let component: MoviesAgGridComponent;
  let fixture: ComponentFixture<MoviesAgGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesAgGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
