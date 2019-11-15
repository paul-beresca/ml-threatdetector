import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  lastKnownScrollPos = 0;
  isReady = false;
  @ViewChild('villain', {static: false}) villainChar: ElementRef;

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event){
  //   const pagePos = Math.floor(window.pageYOffset);
  //   const scale = pagePos > 0 ? pagePos/10 : 0;
  //   if (this.lastKnownScrollPos < pagePos && pagePos % 9 == 0) {
  //     // going down
  //     // this.villainChar.nativeElement.scss
  //     this.villainChar.nativeElement.style.transform = `scale(1.1${scale})`;
  //     console.log('Going down', );
  //   } else {
  //     // going up
  //     this.villainChar.nativeElement.style.transform = `scale(1.1${scale})`;
  //     console.log('Going up');
  //   }
  //   this.lastKnownScrollPos = pagePos;
  // } 

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isReady = true;
    }, 100)
  }

}
