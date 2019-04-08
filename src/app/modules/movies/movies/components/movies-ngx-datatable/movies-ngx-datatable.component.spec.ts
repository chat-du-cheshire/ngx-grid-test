import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNgxDatatableComponent } from './movies-ngx-datatable.component';

describe('MoviesNgxDatatableComponent', () => {
  let component: MoviesNgxDatatableComponent;
  let fixture: ComponentFixture<MoviesNgxDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesNgxDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesNgxDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
