import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  // game1:Game={
  //   title:"Mr.Jack",
  //   price:33.96,
  //   year:2006
  // }; 
  // game2:Game={
  //   title:"Esther's Game",
  //   price:60.00,
  //   year:2021
  // }

  games:Game[]=[]
  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {
    this.gamesDataService.getGames().then(response =>this.games =response)
  }

}

export class Game{
  title!:string;
  price!:number;
  year!:number;
  _id!:string;
}
