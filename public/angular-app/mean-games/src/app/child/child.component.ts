import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() childX!:number;
  @Input() childY!:number;
  z!:number;

  @Output()
  //addEvent=new EventEmitter<number>();
  addEvent:EventEmitter<number>=new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  add():void{
    this.z=this.childX+this.childY;
    this.addEvent.emit(this.z);
  }

}
