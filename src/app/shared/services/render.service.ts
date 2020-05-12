import { Injectable, ElementRef } from '@angular/core';
import { Board } from '../models/board.model';
import { Cell } from '../models/cell.modell';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  readonly _strokeWidth = 1;
  private _canvas: ElementRef<HTMLCanvasElement>;
  private _board: Board;

  public context: CanvasRenderingContext2D;
  public get board() { return this._board; }

  private get aspecRatio(): number {
    return this._board.width / this._board.height;
  }

  constructor() { }

  public init(canvas: ElementRef<HTMLCanvasElement>, board: Board): void {
    this._canvas = canvas;
    this._board = board;
    this.context = this._canvas.nativeElement.getContext('2d');
    this._canvas.nativeElement.width = this._board.width;
    this._canvas.nativeElement.height = this._board.height;
  }

  public drawBoard(): void {
    this._canvas.nativeElement.width = this._board.width;
    this._canvas.nativeElement.height = this._board.height;

    this.context.strokeStyle = this._board.color;
    this.context.strokeRect(0, 0, this._board.width, this._board.height);
    this.context.moveTo(0, 0);
    for (let x = 0; x < this._board.horizontalCells + 1; x++) {
      for (let y = 0; y < this._board.verticalCells + 1; y++) {
        let cellSize = this._board.cellSize;
        this.context.lineTo(0 * x, 0 * y);
        this.context.lineTo(0 * x, cellSize * y);
        this.context.lineTo(cellSize * x, cellSize * y);
        this.context.lineTo(cellSize * x, 0 * y);
      }
    }
    this.context.stroke();
  }

  public drawCells(): void {
    for (const entry of this.board.cells.entries()) {
      const cell = entry[1];
      this.drawCell(cell);
    }
  }

  public drawCell(cell: Cell): void {
    this.context.fillStyle = cell.color;
    let x = ((cell.x - 1) * this.board.cellSize);
    let y = ((cell.y - 1) * this.board.cellSize);
    let width = (this.board.cellSize);
    let height = (this.board.cellSize);

    if (cell.live) {
      x = x + this._strokeWidth * 2;
      y = y + this._strokeWidth * 2;
      width = width - this._strokeWidth * 4;
      height = height - this._strokeWidth * 4;
    }
    else {
      x = x + this._strokeWidth;
      y = y + this._strokeWidth;
      width = width - this._strokeWidth * 2;
      height = height - this._strokeWidth * 2;
    }

    this.context.fillRect(x, y, width, height);
  }
}
