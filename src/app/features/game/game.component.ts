import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RenderService } from 'src/app/shared/services/render.service';
import { Board } from 'src/app/shared/models/board.model';
import { Cell } from 'src/app/shared/models/cell.modell';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private board: Board;
  private timer: any;
  private running: boolean = true;
  private SPACEBAR_KEYCODE: number = 32;

  constructor(readonly logger: LoggerService, readonly renderService: RenderService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.board = new Board(this.logger, window.innerWidth, window.innerHeight, 100/*, undefined, 25*/);
    this.renderService.init(this.canvas, this.board);

    this.resizeToWindow();
    this.iterate();
  }


  private iterate() {
    this.timer = setInterval(() => {
      if (!this.running) return;
      this.board.calculate();
      this.draw();
    }, 10);
  }

  private resizeToWindow() {
    this.board.setWidthHeight(window.innerWidth, window.innerHeight);
    this.draw();
  }

  private draw(): void {
    this.renderService.drawBoard();
    this.renderService.drawCells();
  }

  public onGameClick(event: MouseEvent): void {
    const leftClick = event.buttons == 1;
    const middleClick = event.buttons == 4;

    if (!leftClick && !middleClick) {
      if (!this.timer) {
        this.iterate();
      }
      return;
    }

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    let cell: Cell = this.board.getCellByPoint(event.clientX, event.clientY);
    if (cell) {
      if (cell.dead && leftClick) {
        cell.switch();
        this.board.addCell(cell);
        this.renderService.drawCell(cell);
      }
      if (cell.live && middleClick) {
        cell.switch();
        this.board.addCell(cell);
        this.renderService.drawCell(cell);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeToWindow();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.logger.log(`keypress: ${event.keyCode}`);
    if (event.keyCode == this.SPACEBAR_KEYCODE) {
      this.running = !this.running;
    }
  }
}
