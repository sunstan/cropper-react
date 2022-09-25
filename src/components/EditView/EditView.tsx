import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGE_WIDTH } from 'core/contants';
import styles from './EditView.module.css';
import Dropzone from '../Dropzone';
import Cropper from '../Cropper';

interface Props {
  readonly maxWidth: number;
  readonly onCancel: () => void;
  readonly onSave: (blob: Blob) => void;
}

const EditView: React.FC<Props> = ({ onSave, onCancel, maxWidth }) => {

  const { t } = useTranslation();
  const [files, setFiles] = useState<FileList>();
  const [image, setImage] = useState<HTMLImageElement>();

  const handleCancel = () => {
    setFiles(undefined);
    setImage(undefined);
    onCancel();
  };

  const handleSave = (blob: Blob) => {
    setFiles(undefined);
    setImage(undefined);
    onSave(blob);
  };

  useEffect(() => {
    if (!files?.length) return;

    const image = new window.Image();
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      image.onerror = console.log;
      image.src = reader.result as string;
      image.onload = () => setImage(image);
    };

  }, [files]);

  return (
    <div className={styles.root}>
      {!files?.length && (
        <Dropzone setFiles={setFiles} />
      )}

      {!!image && (
        <Cropper
          image={image}
          save={handleSave}
          width={IMAGE_WIDTH}
          maxWidth={maxWidth}
        />)}

      <div className={styles.button} onClick={handleCancel}>{t('COMMONS.CANCEL')}</div>
    </div>
  );
};

export default EditView;
