import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RenderService } from 'src/app/shared/services/render.service';
import { Board } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  private board: Board;

  constructor(readonly renderService: RenderService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.board = new Board(window.innerWidth, window.innerHeight, 100);
    this.renderService.init(this.canvas, this.board);

    this.resizeToWindow();

    this.renderService.drawBoard();
  }


  private resizeToWindow() {
    this.board.setWidthHeight(window.innerWidth, window.innerHeight);

    this.renderService.drawBoard();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeToWindow();
  }
}
