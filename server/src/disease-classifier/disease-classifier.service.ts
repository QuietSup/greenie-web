import { Injectable, Logger } from '@nestjs/common';
import {
  LayersModel,
  Tensor,
  loadLayersModel,
  scalar,
} from '@tensorflow/tfjs-node';
import { decodeImage } from '@tensorflow/tfjs-node/dist/image';
import { fileSystem } from '@tensorflow/tfjs-node/dist/io';
import { readFile } from 'node:fs/promises';

interface Label {
  [index: number]: string;
}

@Injectable()
export class DiseaseClassifierService {
  private model: LayersModel;
  private labels: Label;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const modelPath = './tf-model/model.json';

      this.model = await loadLayersModel(fileSystem(modelPath));
      const data = await readFile('./tf-model/class_indices.json', 'utf8');
      this.labels = JSON.parse(data);
    } catch (error) {
      Logger.error('Error during initialization:', error);
      throw error;
    }
  }

  imageToUint8Array(
    image: { width: any; height: any },
    context: {
      width: any;
      height: any;
      drawImage: (arg0: any, arg1: number, arg2: number) => void;
      getImageData: (
        arg0: number,
        arg1: number,
        arg2: any,
        arg3: any,
      ) => {
        (): any;
        new (): any;
        data: { (): any; new (): any; buffer: Iterable<number> };
      };
    },
  ): Uint8Array {
    context.width = image.width;
    context.height = image.height;
    context.drawImage(image, 0, 0);
    return new Uint8Array(
      context.getImageData(0, 0, image.width, image.height).data.buffer,
    );
  }

  async predict(img: Uint8Array) {
    const offset = scalar(255);

    const tensorImg = decodeImage(img, 3)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const tensorScaled = tensorImg.div(offset);
    const prediction = await (
      this.model.predict(tensorScaled) as Tensor
    ).data();

    const results: { disease: string; prediction: number }[] = [];

    prediction.forEach((pred, i) => {
      results.push({
        disease: this.labels[i],
        prediction: pred,
      });
    });

    return results.sort((a, b) => b.prediction - a.prediction);
  }
}
