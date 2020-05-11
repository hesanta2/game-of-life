import { Cell } from './cell.modell';

export class Board {
  private _width: number;
  private _height: number;
  private _color: string;
  private _horizontalCells: number;
  private _verticalCells: any;
  private _cells: Cell[] = [];

  public get width(): number { return this._width; }
  public get height(): number { return this._height; };
  public get horizontalCells(): number { return this._horizontalCells; };
  public get verticalCells(): number {
    if (this._verticalCells) { return this._verticalCells; }

    const cellWidthNumber = this._width / this.cellSize;
    return cellWidthNumber * this.aspecRatio;
  };
  public get color(): string { return this._color; };
  public get aspecRatio(): number { return this._width / this._height; }
  public get cellSize(): number {
    return this._width / this._horizontalCells;
  }

  constructor(width: number, height: number, horizontalCells: number, color = '#3f3f3f', verticalCells = undefined) {
    this._width = width;
    this._height = height;
    this._horizontalCells = horizontalCells;
    this._verticalCells = verticalCells;
    this._color = color
  }

  public setWidthHeight(width: number, height: number) {
    this._width = width;
    this._height = height;
  }
}
