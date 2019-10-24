import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TensorflowExampleComponent } from './tensorflow-example.component';

describe('TensorflowExampleComponent', () => {
  let component: TensorflowExampleComponent;
  let fixture: ComponentFixture<TensorflowExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensorflowExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorflowExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
