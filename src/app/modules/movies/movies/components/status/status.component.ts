import {Component, HostBinding, Input} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements ICellRendererAngularComp {
  @HostBinding('class.ok') @Input() value = false;
  params: ICellRendererParams = null;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = params.value;
  }

  refresh(params: any): boolean {
    return false;
  }

  randomizeHeight() {
    this.params.node.setRowHeight(Math.round(Math.random() * 10) * 10);
    this.params.api.onRowHeightChanged();
  }
}
