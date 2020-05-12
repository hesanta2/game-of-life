import { Cell } from './cell.modell';
import { LoggerService } from '../services/logger.service';

export class Board {
  private _logger: LoggerService;
  private _width: number;
  private _height: number;
  private _color: string;
  private _horizontalCells: number;
  private _verticalCells: any;
  private _cells = new Map<string, Cell>();

  public get width(): number { return this._width; }
  public get height(): number {
    if (this._height) { return this._height }

    return this.cellSize * this.verticalCells;
  };
  public get horizontalCells(): number { return this._horizontalCells; };
  public get verticalCells(): number {
    if (this._verticalCells) { return this._verticalCells; }
    return Math.ceil(this._height / this.cellSize);
  };
  public get color(): string { return this._color; };
  public get aspecRatio(): number { return this._width / this.height; }
  public get cellSize(): number {
    return this._width / this._horizontalCells;
  }
  public get cells(): Map<string, Cell> { return this._cells; }

  constructor(logger: LoggerService, width: number, height: number, horizontalCells: number, color = '#3f3f3f', verticalCells = undefined) {
    this._logger = logger;
    this._width = width;
    this._height = !verticalCells ? height : undefined;
    this._horizontalCells = horizontalCells;
    this._verticalCells = verticalCells;
    this._color = color
  }

  public setWidthHeight(width: number, height: number) {
    this._width = width;
    this._height = this.verticalCells ? height : undefined;
  }

  public getCellByPoint(x: number, y: number): Cell {
    const horizontalCell = Math.ceil(this.horizontalCells * x / this._width);
    const verticalCell = Math.ceil(this.verticalCells * y / this.height);

    this._logger.log(`mouseX: ${x}, mouseY: ${y}`);
    this._logger.log(`horizontalCells: ${this.horizontalCells}, verticalCells: ${this.verticalCells}`);
    this._logger.log(`horizontal: ${horizontalCell}, vertical: ${verticalCell}`);

    return this.getCell(horizontalCell, verticalCell);
  }

  public getCell(x: number, y: number): Cell {
    //if (!(x <= this.horizontalCells && y <= this.verticalCells)) return undefined;
    const key = `${x}-${y}`;
    const cell = this._cells.get(key)
    return cell ? cell : new Cell(x, y, false);
  }

  public addCell(cell: Cell, cells: Map<string, Cell> = undefined): void {
    const localCells = cells ? cells : this.cells;

    const key = `${cell.x}-${cell.y}`;
    if (cell.live && !localCells.has(key)) {
      localCells.set(key, cell);
    }

    if (cell.dead && localCells.has(key)) {
      localCells.delete(key);
    }
  }

  public calculate(): void {
    const cloneCells = new Map<string, Cell>();

    for (let x = 0; x < this.horizontalCells+1; x++) {
      for (let y = 0; y < this.verticalCells+1; y++) {
        const key = `${x}-${y}`;
        const cell = this.getCell(x, y);
        const cloneCell = cell.clone();
        this.calculateCell(cloneCell);
        this.addCell(cloneCell, cloneCells);
        //cloneCells.set(key, cloneCell);
      }
    }

    this._cells = cloneCells;
  }
  private calculateCell(cell: Cell): void {
    const cell1 = this.getCell(this.mod((cell.x - 1), this.horizontalCells), this.mod((cell.y - 1), this.verticalCells));
    const cell2 = this.getCell(this.mod((cell.x - 1), this.horizontalCells), this.mod((cell.y), this.verticalCells));
    const cell3 = this.getCell(this.mod((cell.x - 1), this.horizontalCells), this.mod((cell.y + 1), this.verticalCells));
    const cell4 = this.getCell(this.mod((cell.x), this.horizontalCells), this.mod((cell.y + 1), this.verticalCells));
    const cell5 = this.getCell(this.mod((cell.x + 1), this.horizontalCells), this.mod((cell.y + 1), this.verticalCells));
    const cell6 = this.getCell(this.mod((cell.x + 1), this.horizontalCells), this.mod((cell.y), this.verticalCells));
    const cell7 = this.getCell(this.mod((cell.x + 1), this.horizontalCells), this.mod((cell.y - 1), this.verticalCells));
    const cell8 = this.getCell(this.mod((cell.x), this.horizontalCells), this.mod((cell.y - 1), this.verticalCells));

    const aliveCells: Cell[] = [];
    const deadCells: Cell[] = [];
    if (cell1.live) aliveCells.push(cell1); else deadCells.push(cell1);
    if (cell2.live) aliveCells.push(cell2); else deadCells.push(cell2);
    if (cell3.live) aliveCells.push(cell3); else deadCells.push(cell3);
    if (cell4.live) aliveCells.push(cell4); else deadCells.push(cell4);
    if (cell5.live) aliveCells.push(cell5); else deadCells.push(cell5);
    if (cell6.live) aliveCells.push(cell6); else deadCells.push(cell6);
    if (cell7.live) aliveCells.push(cell7); else deadCells.push(cell7);
    if (cell8.live) aliveCells.push(cell8); else deadCells.push(cell8);

    if (cell.dead && aliveCells.length == 3) {
      cell.setLive();
    }
    else if (cell.live && aliveCells.length < 2 || aliveCells.length > 3) {
      cell.setDead();
    }
  }

  private mod(n1: number, n2: number): number {
    return ((n1 % n2) + n2) % n2;
  }
}
