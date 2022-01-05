import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  homeClick():void{
    this._router.navigate([""])
  }
  gameClick():void{
    this._router.navigate(["games"])
  }
  registerClick():void{
    this._router.navigate(["register"])
  }
  parentClick():void{
    this._router.navigate(["parent"])
  }



}
