import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

// TO DO: move in models folder
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-train-tool',
  templateUrl: './image-train-tool.component.html',
  styleUrls: ['./image-train-tool.component.css']
})

export class ImageTrainToolComponent implements OnInit, AfterViewInit {

  @ViewChild('targetImage', {static: false}) targetImage: ElementRef;
  selectedFile: ImageSnippet;
  img = '';
  fileName: string;
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    console.log(this.targetImage);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      console.log(event.target);
      this.img = event.target.result;
      this.cdRef.detectChanges();
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.fileName = this.selectedFile.file.name.split('.')[0];
    });
    this.createXML();
  }

  createXML() {
    const imageWidth = this.targetImage.nativeElement.width;
    const imageHeight = this.targetImage.nativeElement.height;
    console.log('Size', imageWidth, 'X', imageHeight);
  }
}

