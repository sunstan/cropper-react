import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import useBoolean from 'core/hooks/useBoolean';
import styles from './Dropzone.module.css';

interface Props {
  readonly className?: string;
  readonly setFiles: Dispatch<SetStateAction<FileList | undefined>>;
}

const Dropzone: React.FC<Props> = ({ setFiles, className }) => {

  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useBoolean(false);

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging.on();
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging.off();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging.off();
    const files = event.dataTransfer.files;
    if (files?.length) setFiles(files);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target.files;
    if (files?.length) setFiles(files);
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        ${styles.root}
        ${isDragging ? styles.isDragging : styles.default}
        ${className}
      `}
    >
      <span className={styles.text}>{t('DROPZONE.TEXT')}</span>
      <label className={`${styles.button} ${isDragging ? styles.isDragging : ''}`}>
        {t('DROPZONE.BUTTON')}
        <input hidden type='file' onChange={onChange} />
      </label>
    </div>
  );
};

export default Dropzone;