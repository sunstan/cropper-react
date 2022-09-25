import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './Slider.module.css';

interface Props {
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly value?: number;
  readonly onChange: (value: number) => void;
}


const Slider: React.FC<Props> = ({ onChange, min = 0, max = 100, step = 1, value = min }) => {

  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(parseInt(value, 10));
  };

  useEffect(() => {
    if (!thumbRef.current || !trackRef.current) return;
    const ratio = (value - min) / (max - min) * 100;
    trackRef.current.style.width = `${ratio}%`;
    thumbRef.current.style.left = `${ratio}%`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={`${styles.root} ${styles.root}`}>

      <div className={styles.wrapper}>

        <input
          min={min}
          max={max}
          step={step}
          type='range'
          defaultValue={value}
          onChange={handleChange}
        />

        <div className={styles.trackContainer}>
          <div ref={trackRef} className={styles.track} />
        </div>

        <div className={styles.thumbContainer}>
          <div ref={thumbRef} className={styles.thumb} />
        </div>

      </div>

    </div>
  );
};

export default Slider;
