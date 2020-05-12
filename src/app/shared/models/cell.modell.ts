export class Cell {
  private _x: number;
  private _y: number;
  private _live = false;
  private _liveColor = '#FFFFFF';
  private _deadColor = '#202020';

  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get live() { return this._live; }
  public get dead() { return !this._live; }
  public get liveColor() { return this._liveColor; }
  public get deadColor() { return this._deadColor; }
  public get color() { return this._live ? this._liveColor : this._deadColor; }

  constructor(x: number, y: number, live: boolean) {
    this._x = x;
    this._y = y;
    this._live = live;
  }

  public switch(): boolean {
    this._live = !this.live;
    return this._live;
  }

  public setLive(): void {
    this._live = true;
  }

  public setDead(): void {
    this._live = false;
  }

  public clone(): Cell {
    return new Cell(this.x, this.y, this.live);
  }
}
