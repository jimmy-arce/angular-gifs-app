import { Component } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor( private GifsService: GifsService ){}

  get gifs(): Gif[] {
    return this.GifsService.gifList;
  }

}
