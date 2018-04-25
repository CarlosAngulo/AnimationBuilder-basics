import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('charOnePosTrigger', [
      state('right', style({transform:'translateX(100px)'})),
      state('left', style({transform:'translateX(-100px)'})),
      state('down', style({transform:'translateY(100px)'})),
      state('up', style({transform:'translateY(-100px)'})),
      transition('*=>*', animate('300ms ease-out'))
    ])
  ]
})
export class AppComponent {
  
  @ViewChild('withBuilder', {read: ElementRef}) elCharTwo: ElementRef;

  charOnePos = '';
  charTwoTurn = 'down';
  charTwoPos = {x: 0, y: 0};  
  player: AnimationPlayer;

  constructor( private _builder: AnimationBuilder) {}

  charOneMove(pos:string) {
    this.charOnePos = pos;
  }

  charTwoMove(pos:string) {
    
    if(this.player) {
      this.player.destroy();
    }

    this.charTwoTurn = pos;

    switch(pos){
      case 'up':
        this.charTwoPos.y -= 100;
      break;
      case 'down':
        this.charTwoPos.y += 100;
      break;
      case 'left':
        this.charTwoPos.x -= 100;
      break;
      case 'right':
        this.charTwoPos.x += 100;
      break;
    }

    this.player = this._builder.build([
      animate(
        '300ms ease-out', 
        style({
          transform: `translate(${this.charTwoPos.x}px, ${this.charTwoPos.y}px)`
        }))
    ]).create(this.elCharTwo.nativeElement);

    this.player.play();
    this.elCharTwo.nativeElement.style.transform = `translate(${this.charTwoPos.x}px, ${this.charTwoPos.y}px)`;
    
  }

}
