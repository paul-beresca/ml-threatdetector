import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTrainToolComponent } from './image-train-tool.component';

describe('ImageTrainToolComponent', () => {
  let component: ImageTrainToolComponent;
  let fixture: ComponentFixture<ImageTrainToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTrainToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTrainToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
