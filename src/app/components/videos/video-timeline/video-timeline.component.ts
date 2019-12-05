import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-video-timeline',
  templateUrl: './video-timeline.component.html',
  styleUrls: ['./video-timeline.component.scss']
})
export class VideoTimelineComponent implements OnInit, OnChanges {
  @ViewChild('timelineContainer', { static: true }) timelineContainer: ElementRef;
  @ViewChild('timeline', { static: false }) timeline: GoogleChartComponent;

  @Input() timelineData: any;
  @Input() timelineDuration: any;

  @Output() videoTime = new EventEmitter<number>();

  private startTime = new Date(2019, 1, 1, 1, 0, 0);
  public title = 'Detections timeline';
  public data: any = this.getDefaultTimeline();

  myOptions = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e'],
    tooltip: { trigger: 'none' },
    backgroundColor: '#648989',
    hAxis: {
      format: 'mm:ss',
      minValue: this.startTime,
      maxValue: new Date(this.startTime.getTime() + 1000),
    }
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.timelineData) {
      const td = changes.timelineData.currentValue;
      if (td !== null && td.length > 0) {
        this.data = [];
        td.forEach(x => {
          const name = x[0].charAt(0).toUpperCase() + x[0].slice(1);
          const start = new Date(this.startTime.getTime() + x[1] * 1000);
          const end = new Date(this.startTime.getTime() + x[2] * 1000);
          this.data.push([name, start, end]);
        });
      }
    }

    if (changes.timelineDuration) {
      if (this.timeline && this.timeline.wrapper) {
        const newDate = new Date(this.startTime.getTime() + changes.timelineDuration.currentValue * 1000);

        const h = {
          format: 'mm:ss',
          minValue: this.startTime,
          maxValue: newDate,
        };

        this.timeline.wrapper.setOption('hAxis', h);
        this.timeline.wrapper.draw();
      }
    }
  }

  onSelect(event) {
    const time = this.data[event[0].row][1];
    const seconds = (time.getTime() - this.startTime.getTime()) / 1000;
    console.log('Clicked', seconds);
    this.videoTime.emit(Math.floor(seconds));
  }

  getDefaultTimeline() {
    return [
      ['rifle', this.startTime, this.startTime],
      ['pistol', this.startTime, this.startTime],
      ['bear', this.startTime, this.startTime],
    ];
  }
}
