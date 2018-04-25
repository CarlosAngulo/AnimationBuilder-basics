import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('moveCharacterOne', [
      state('right', style({transform:'translateX(100px)'})),
      state('left', style({transform:'translateX(-100px)'})),
      state('down', style({transform:'translateY(100px)'})),
      state('up', style({transform:'translateY(-100px)'})),
      transition('*=>*', animate('300ms ease-out'))
    ])
  ]
})
export class AppComponent {
  
  @ViewChild('withBuilder', {read: ElementRef}) characterTwo: ElementRef;

  positionCharacterOne = '';
  positionCharacterTwo = {x: 0, y: 0};
  
  player: AnimationPlayer;

  constructor( private _builder: AnimationBuilder) {

  }

  changePositionCharTwo(pos:string) {
    let direction = '';

    if(this.player) {
      this.player.destroy();
    }

    switch(pos){
      case 'up':
        this.positionCharacterTwo.y -= 100;
      break;
      case 'down':
        this.positionCharacterTwo.y += 100;
      break;
      case 'left':
        this.positionCharacterTwo.x -= 100;
      break;
      case 'right':
        this.positionCharacterTwo.x += 100;
      break;
    }

    this.player = this._builder.build([
      animate(
        '300ms ease-out', 
        style({
          transform: `translate(${this.positionCharacterTwo.x}px, ${this.positionCharacterTwo.y}px)`
        }))
    ]).create(this.characterTwo.nativeElement);

    this.player.play();
    this.characterTwo.nativeElement.style.transform = `translate(${this.positionCharacterTwo.x}px, ${this.positionCharacterTwo.y}px)`;
    
  }
  

  changePositionCharOne(newPos) {
    this.positionCharacterOne = newPos;
  }

}
