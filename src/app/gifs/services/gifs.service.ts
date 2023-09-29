import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'DB9rHuBE8EHBDwjTKNJN6IDEZUDOhJEg';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();    //Convierte a minúscula
    if (this._tagsHistory.includes(tag)){     // Incluye el tag nuevo que se está recibiendo como argumento
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)    // Elimina todas las coincidencias anteriores
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);    //Mantiene solo 10 registros
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;      //Sino tenemos data en el history, retornamos y no hacemos nada
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if(this._tagsHistory.length===0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
      .subscribe( resp => {

        this.gifList = resp.data;
        console.log({ gifs: this.gifList });

      });

    //También se podría trabajar de esta manera:
    //async searchTag(tag:string):Promise<void>{

    //const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=DB9rHuBE8EHBDwjTKNJN6IDEZUDOhJEg&q=Valorant&limit=10');
    //const data = await resp.json();
    //console.log(data);

    //También se podría trabajar de esta manera:
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=DB9rHuBE8EHBDwjTKNJN6IDEZUDOhJEg&q=Valorant&limit=10')
    //  .then( resp => resp.json() )
    //  .then( data => console.log(data) );

  }

}
