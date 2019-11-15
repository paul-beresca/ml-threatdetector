import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  lastKnownScrollPos = 0;
  isReady = false;
  shouldTitleAndMenuAppear = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isReady = true;
    }, 100)
    setTimeout(() => {
      this.shouldTitleAndMenuAppear = true;
    }, 5000);
  }

}
