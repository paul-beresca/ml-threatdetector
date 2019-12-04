import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

// import COCO-SSD model as cocoSSD
import * as tfconv from '@tensorflow/tfjs-converter';
import * as tf from '@tensorflow/tfjs-core';
import { CLASSES } from './classes';

export type ObjectDetectionBaseModel =
  'mobilenet_v1' | 'mobilenet_v2' | 'lite_mobilenet_v2';

export interface DetectedObject {
  bbox: [number, number, number, number];  // [x, y, width, height]
  class: string;
  score: number;
}

/**
 * Coco-ssd model loading is configurable using the following config dictionary.
 *
 * `base`: ObjectDetectionBaseModel. It determines wich PoseNet architecture
 * to load. The supported architectures are: 'mobilenet_v1', 'mobilenet_v2' and
 * 'lite_mobilenet_v2'. It is default to 'lite_mobilenet_v2'.
 *
 * `modelUrl`: An optional string that specifies custom url of the model. This
 * is useful for area/countries that don't have access to the model hosted on
 * GCP.
 */
export interface ModelConfig {
  base?: ObjectDetectionBaseModel;
  modelUrl?: string;
}

@Component({
  selector: 'app-tensorflow-example',
  templateUrl: './tensorflow-example.component.html',
  styleUrls: ['./tensorflow-example.component.scss']
})
export class TensorflowExampleComponent implements OnInit, AfterViewInit {
  title = 'TF-ObjectDetection';
  private video: HTMLVideoElement;
  @Input() videoSrc: any;
  @Input() videoId: string;
  @Input() isLive: string;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.webcam_init();
  }

  public async predictWithCocoModel() {
    const x = new ObjectDetection('mobilenet_v1');
    const modelPromise = load();
    const model = await modelPromise;
    // model.dispose();
    // modelPromise = load();

    this.detectFrame(this.video, model);
    // x.load().then((model) => {
    //   console.log(model);
    // const modelPromise = model.load();
    //   this.detectFrame(this.video, modelx);
    // // console.log('model loaded', model);
    // });
    // this.detectFrame(this.video, model);
    // console.log('model loaded', model);
  }

  webcam_init() {
    this.video = <HTMLVideoElement>document.getElementById(`vid${this.videoId}`);
    if (this.isLive) {
      console.log(this.videoSrc);
      this.video.srcObject = this.videoSrc;
    } else {
      this.video.src = this.videoSrc;
    }
    this.video.src = this.videoSrc;
    this.video.onloadeddata = () => {
      this.video.width = this.video.videoWidth;
      this.video.height = this.video.videoHeight;

      this.video.play();
      this.predictWithCocoModel();
    };
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  }

  renderPredictions = predictions => {
    const canvas = <HTMLCanvasElement>document.getElementById(`canvas${this.videoId}`);
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');

    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = '16px sans-serif';
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = '#00FFFF';
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10

      const labelHeight = textHeight + 4;
      const labelWidth = textWidth + 4;
      ctx.fillRect(x, y - labelHeight, labelWidth, labelHeight);

      ctx.fillStyle = '#000000';
      ctx.fillText(prediction.class, x, y - labelHeight);
      
      // Draw border around canvas to signal that something was found
      ctx.lineWidth = 15;
      ctx.strokeStyle = "#FF0000";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    });
  }

}

export async function load(config: ModelConfig = {}) {
  if (tf == null) {
    throw new Error(
      `Cannot find TensorFlow.js. If you are using a <script> tag, please ` +
      `also include @tensorflow/tfjs on the page before using this model.`);
  }
  const base = config.base || 'lite_mobilenet_v2';
  const modelUrl = config.modelUrl;
  if (['mobilenet_v1', 'mobilenet_v2', 'lite_mobilenet_v2'].indexOf(base) ===
    -1) {
    throw new Error(
      `ObjectDetection constructed with invalid base model ` +
      `${base}. Valid names are 'mobilenet_v1',` +
      ` 'mobilenet_v2' and 'lite_mobilenet_v2'.`);
  }

  const objectDetection = new ObjectDetection(base, modelUrl);
  await objectDetection.load();
  return objectDetection;
}

class ObjectDetection {
  private modelPath: string;
  private model: tfconv.GraphModel;

  constructor(base: ObjectDetectionBaseModel, modelUrl?: string) {
    this.modelPath = '../../assets/model.json';
  }

  private getPrefix(base: ObjectDetectionBaseModel) {
    return base === 'lite_mobilenet_v2' ? `ssd${base}` : `ssd_${base}`;
  }

  async load() {
    this.model = await tfconv.loadGraphModel(this.modelPath);
    // Warmup the model.
    const result = await this.model.executeAsync(tf.zeros([1, 300, 300, 3])) as
      tf.Tensor[];
    await Promise.all(result.map(t => t.data()));
    result.map(t => t.dispose());
  }

  /**
   * Infers through the model.
   *
   * @param img The image to classify. Can be a tensor or a DOM element image,
   * video, or canvas.
   * @param maxNumBoxes The maximum number of bounding boxes of detected
   * objects. There can be multiple objects of the same class, but at different
   * locations. Defaults to 20.
   */
  private async infer(
    img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement |
      HTMLVideoElement,
    maxNumBoxes: number): Promise<DetectedObject[]> {
    const batched = tf.tidy(() => {
      if (!(img instanceof tf.Tensor)) {
        img = tf.browser.fromPixels(img);
      }
      // Reshape to a single-element batch so we can pass it to executeAsync.
      return img.expandDims(0);
    });
    const height = batched.shape[1];
    const width = batched.shape[2];

    // model returns two tensors:
    // 1. box classification score with shape of [1, 1917, 90]
    // 2. box location with shape of [1, 1917, 1, 4]
    // where 1917 is the number of box detectors, 90 is the number of classes.
    // and 4 is the four coordinates of the box.
    const result = await this.model.executeAsync(batched) as tf.Tensor[];
    console.log(result);

    const scores = result[0].dataSync() as Float32Array;
    const boxes = result[1].dataSync() as Float32Array;
    console.log('scores', result[0]);
    console.log('scores1', result[1]);

    // clean the webgl tensors
    batched.dispose();
    tf.dispose(result);

    const [maxScores, classes] =
      this.calculateMaxScores(scores, result[0].shape[1], result[0].shape[2]);

    const prevBackend = tf.getBackend();
    // run post process in cpu
    tf.setBackend('cpu');
    console.log('BOXES', result[1]);
    const indexTensor = tf.tidy(() => {
      const boxes2 =
        tf.tensor2d(boxes, [result[1].shape[1], 4]);
      return tf.image.nonMaxSuppression(
        boxes2, maxScores, maxNumBoxes, 0.5, 0.5);
    });

    const indexes = indexTensor.dataSync() as Float32Array;
    indexTensor.dispose();

    // restore previous backend
    tf.setBackend(prevBackend);

    return this.buildDetectedObjects(
      width, height, boxes, maxScores, indexes, classes);
  }

  private buildDetectedObjects(
    width: number, height: number, boxes: Float32Array, scores: number[],
    indexes: Float32Array, classes: number[]): DetectedObject[] {
    const count = indexes.length;
    const objects: DetectedObject[] = [];
    for (let i = 0; i < count; i++) {
      const bbox = [];
      for (let j = 0; j < 4; j++) {
        bbox[j] = boxes[indexes[i] * 4 + j];
      }
      const minY = bbox[0] * height;
      const minX = bbox[1] * width;
      const maxY = bbox[2] * height;
      const maxX = bbox[3] * width;
      bbox[0] = minX;
      bbox[1] = minY;
      bbox[2] = maxX - minX;
      bbox[3] = maxY - minY;
      objects.push({
        bbox: bbox as [number, number, number, number],
        class: CLASSES[classes[indexes[i]] + 1].displayName,
        score: scores[indexes[i]]
      });
    }
    return objects;
  }

  private calculateMaxScores(
    scores: Float32Array, numBoxes: number,
    numClasses: number): [number[], number[]] {
    const maxes = [];
    const classes = [];
    for (let i = 0; i < numBoxes; i++) {
      let max = Number.MIN_VALUE;
      let index = -1;
      for (let j = 0; j < numClasses; j++) {
        if (scores[i * numClasses + j] > max) {
          max = scores[i * numClasses + j];
          index = j;
        }
      }
      maxes[i] = max;
      classes[i] = index;
    }
    return [maxes, classes];
  }

  /**
   * Detect objects for an image returning a list of bounding boxes with
   * assocated class and score.
   *
   * @param img The image to detect objects from. Can be a tensor or a DOM
   *     element image, video, or canvas.
   * @param maxNumBoxes The maximum number of bounding boxes of detected
   * objects. There can be multiple objects of the same class, but at different
   * locations. Defaults to 20.
   *
   */
  async detect(
    img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement |
      HTMLVideoElement,
    maxNumBoxes = 20): Promise<DetectedObject[]> {
    return this.infer(img, maxNumBoxes);
  }

  /**
   * Dispose the tensors allocated by the model. You should call this when you
   * are done with the model.
   */
  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }
}
