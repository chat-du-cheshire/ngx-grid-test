import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements ICellRendererAngularComp {
  @HostBinding('class.ok') @Input() value = false;

  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.value = params.value;
  }

  refresh(params: any): boolean {
    return false;
  }
}
