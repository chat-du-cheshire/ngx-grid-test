import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @HostBinding('class.ok') @Input() value = false;
}
