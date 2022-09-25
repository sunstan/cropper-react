import React, { CSSProperties, PointerEvent, useEffect, useRef, useState, WheelEvent } from 'react';
import { canvasToBlob, getCanvas } from 'core/helpers/images.helpers';
import useBoolean from 'core/hooks/useBoolean';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut } from 'lib/Icons';
import styles from './Cropper.module.css';
import { Button, Slider } from 'lib';

interface Props {
  readonly width: number;
  readonly maxWidth: number;
  readonly image: HTMLImageElement;
  readonly save: (blob: Blob) => void;
}

const Cropper: React.FC<Props> = ({ width, maxWidth, image, save }) => {

  const [isLoading, setIsLoading] = useBoolean(false);
  const [isDragging, setIsDragging] = useBoolean(false);
  const [error, setError] = useState<string>();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const [clientX, setClientX] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);
  const [minScale, setMinScale] = useState<number>(0);

  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const gap = (1 - minScale) / 8 * 100;

  // ACTIONS

  const handleSave = async () => {
    setIsLoading.on();
    try {
      const canvas = getCanvas(image, width, left, top, scale);
      const blob = await canvasToBlob(canvas);
      save(blob);
    } catch (e) {
      return setError(t('ERRORS.UNKNOWN'));
    } finally {
      setIsLoading.off();
    }
  };

  // EVENTS LISTENERS

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging.on();
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const clientLeft = left + (event.clientX - clientX);
    const clientTop = top + (event.clientY - clientY);
    const _left = getLeft(clientLeft);
    const _top = getTop(clientTop);
    updateStyle(_left, _top, scale);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging.off();
    const clientLeft = left + (event.clientX - clientX);
    const clientTop = top + (event.clientY - clientY);
    setLeft(getLeft(clientLeft));
    setTop(getTop(clientTop));
    setClientX(0);
    setClientY(0);
  };

  const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    event.deltaY < 0
      ? handleZoomIn()
      : handleZoomOut();
  };

  const handleScale = (value: number) => {

    const _scale = value >= minScale * 100
      ? value > 100 ? 1 : value / 100
      : minScale;

    const nX = _scale > scale
      ? (width / 2) - (((width / 2) + Math.abs(left)) / (scale / _scale))
      : (width / 2) - (((width / 2) + Math.abs(left)) * (_scale / scale));

    const nY = _scale > scale
      ? (width / 2) - (((width / 2) + Math.abs(top)) / (scale / _scale))
      : (width / 2) - (((width / 2) + Math.abs(top)) * (_scale / scale));

    const _left = getLeft(nX, _scale);
    const _top = getTop(nY, _scale);

    updateStyle(_left, _top, _scale)

    setScale(_scale);
    setLeft(_left);
    setTop(_top);
  };

  const handleZoomOut = () => {
    handleScale((scale * 100) - gap);
  };

  const handleZoomIn = () => {
    handleScale(scale * 100 + gap);
  };

  // UTILITIES

  const updateStyle = (left: number, top: number, scale: number) => {
    if (!imageRef.current) return;
    const image = imageRef.current as HTMLImageElement;
    image.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
  };

  const getLeft = (tempLeft: number, _scale = scale): number => {
    if (!imageRef.current) return 0;
    const image = imageRef.current as HTMLImageElement;
    const minLeft = width - (image.naturalWidth * _scale);
    if (tempLeft < minLeft) return minLeft;
    if (tempLeft > 0) return 0;
    return tempLeft || 0;
  };

  const getTop = (tempTop: number, _scale = scale): number => {
    if (!imageRef.current) return 0;
    const image = imageRef.current as HTMLImageElement;
    const minTop = width - (image.naturalHeight * _scale);
    if (tempTop < minTop) return minTop;
    if (tempTop > 0) return 0;
    return tempTop || 0;
  };

  // EFFECTS

  useEffect(() => {
    if (!imageRef.current) return;

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const widthRatio = width / imageWidth;
    const heightRatio = width / imageHeight;

    const _scale = Math.max(widthRatio, heightRatio);
    const _left = (width - (imageWidth * minScale)) / 2;
    const _top = (width - (imageHeight * minScale)) / 2;

    updateStyle(_left, _top, _scale);

    setTop(_top);
    setLeft(_left);
    setScale(_scale);
    setMinScale(_scale);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, width, minScale]);

  return (
    <div
      ref={containerRef}
      className={styles.root}
      style={{
        '--ui-ratio': maxWidth < width ? maxWidth / width : 1,
        '--width': maxWidth < width ? width * maxWidth / width : width + 'px',
      } as CSSProperties}
    >

      <div
        ref={boxRef}
        onWheel={handleScroll}
        className={styles.box}
        style={{
          '--width': width + 'px',
          '--height': width + 'px',
          '--margins': maxWidth < width ? -((width - maxWidth) / 2) + 'px' : '0',
        } as CSSProperties}
      >
        <div className={styles.overlay}>
          <svg viewBox={`0 0 ${width} ${width}`} width='100%' height='100%'>
            <defs>
              <mask id='mask' x='0' y='0' width={width} height={width}>
                <rect x='0' y='0' width={width} height={width} fill='#FFFFFF' />
                <circle cx={width / 2} cy={width / 2} r={width / 2} />
              </mask>
            </defs>
            <rect x='0' y='0' width={width} height={width} fill='currentColor' mask='url(#mask)'
                  fillOpacity='0.3' />
          </svg>
        </div>

        <img
          alt=''
          ref={imageRef}
          src={image?.src}
          draggable={'false'}
          className={styles.image}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
        />
      </div>

        {!!minScale && minScale < 1 && (
          <div className={styles.controls}>
            <ZoomOut className={styles.icon} onClick={handleZoomOut} />
            <Slider
              min={Math.ceil(Math.round(minScale * 100))}
              value={Math.ceil(Math.round(scale * 100))}
              onChange={handleScale}
            />
            <ZoomIn className={styles.icon} onClick={handleZoomIn} />
          </div>
        )}

      {!!error && <div className={styles.error} children={error} />}

      {isLoading && 'TRUE'}

      <Button
        loading={isLoading}
        onClick={handleSave}
        children={t('COMMONS.VALIDATE')}
      />

    </div>
  );
};

export default Cropper;
