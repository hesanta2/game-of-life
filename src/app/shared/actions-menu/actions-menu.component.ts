import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss']
})
export class ActionsMenuComponent implements OnInit {

  public open = true;
  @Input() public isPlaying = true;
  @Output() public onPlay = new EventEmitter();
  @Output() public onPause = new EventEmitter();
  @Output() public onReset = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public play(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.onPlay.emit();
    }
    if (!this.isPlaying) {
      this.onPause.emit();
    }
  }

  public reset(): void {
    this.onReset.emit();
  }
}
