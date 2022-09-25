import { useEffect, useState } from 'react';
import * as face from '@vladmandic/face-api';

const useFaceDetection = () => {

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const detect = async (canvas: HTMLCanvasElement) => {
    setIsDetecting(true);
    const detections = await face.detectAllFaces(canvas);
    setIsDetecting(false);
    return detections;
  };

  useEffect(() => {
    const onInit = async () => {
      const MODEL_URL = '/models'
      await face.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      setIsReady(true);
    };
    onInit().then();
  }, []);

  return {
    detect,
    isReady,
    isDetecting,
  }
};

export default useFaceDetection;
