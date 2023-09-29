import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})

export class LazyImageComponent implements OnInit {
ngOnInit(): void {
  if (!this.url) throw new Error('URL property is required.');
}

@Input()
public url!: string;

@Input()
public alt: string='';

public hasLoader: boolean = false;

onLoad(){
  this.hasLoader = true;
}

//onLoad(){
//  setTimeout(() => {
//  this.hasLoader = true;
//  }, 500);
//}

}
