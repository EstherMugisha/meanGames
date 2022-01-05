import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from '../games-list/games-list.component';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!:Game
  id!:any;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private gamesDataService: GamesDataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      
     this.id=params.get("gameId");
      this.gamesDataService.getGame(this.id).then(response =>this.game =response)
    })
  }

}
