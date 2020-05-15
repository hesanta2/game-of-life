import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss']
})
export class ActionsMenuComponent implements OnInit {

  public open = true;

  @Input() play = true;

  constructor() { }

  ngOnInit() {
  }

}
