import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ActionsMenuComponent } from 'src/app/shared/actions-menu/actions-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameComponent,
    ActionsMenuComponent
  ],
  exports: [GameComponent]
})
export class GameModule { }
