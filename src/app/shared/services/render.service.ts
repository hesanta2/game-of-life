import { Injectable, ElementRef } from '@angular/core';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
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
    this.context.beginPath();
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
}
