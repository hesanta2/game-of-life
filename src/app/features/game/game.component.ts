import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActionsMenuComponent } from 'src/app/shared/actions-menu/actions-menu.component';
import { Board } from 'src/app/shared/models/board.model';
import { Cell } from 'src/app/shared/models/cell.modell';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { RenderService } from 'src/app/shared/services/render.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private SPACEBAR_KEYCODE: number = 32;
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('menu', { static: true })
  public menu: ActionsMenuComponent;
  private board: Board;
  private timer: any;
  private _running: boolean = true;
  private set running(value: boolean) {
    this._running = value;
    this.menu.isPlaying = value;
  }
  private get running(): boolean {
    return this._running;
  }
  private verticalCellsNumber = 100;
  private refreshMilliseconds = 1;



  constructor(readonly logger: LoggerService, readonly renderService: RenderService) { }

  ngOnInit() {
    this.init();
    this.menu.onPlay.subscribe(() => this.running = true);
    this.menu.onPause.subscribe(() => this.running = false);
    this.menu.onReset.subscribe(() => this.init());
  }

  private init() {
    this.board = new Board(this.logger, window.innerWidth, window.innerHeight, this.verticalCellsNumber);
    this.renderService.init(this.canvas, this.board);

    this.resizeToWindow();
    this.iterate();
  }


  private iterate() {
    this.timer = setInterval(() => {
      if (!this.running) return;
      this.board.calculate();
      this.draw();
    }, this.refreshMilliseconds);
  }

  private resizeToWindow() {
    this.board.setWidthHeight(window.innerWidth, window.innerHeight);
    this.draw();
  }

  private draw(): void {
    this.renderService.drawBoard();
    this.renderService.drawCells();
  }

  public onMouseDown(event: MouseEvent): void {
    const leftClick = event.buttons == 1;
    const middleClick = event.buttons == 4;

    if (leftClick || middleClick) {
      this.running = false;
    }

    /*if (this.timer) {
      this.running = false;
    }*/

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

  public onMouseMove(event: MouseEvent): void {

  }

  public onMouseUp(event: MouseEvent): void {
    this.running = true;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_): void {
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
