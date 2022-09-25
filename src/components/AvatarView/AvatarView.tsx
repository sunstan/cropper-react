import avatar from 'assets/images/default.jpg';
import styles from './AvatarView.module.css';
import { Button } from 'lib';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  readonly blob?: Blob;
  readonly onEdit: () => void;
  readonly onRemove: () => void;
}

const AvatarView: React.FC<Props> = ({ blob,onEdit, onRemove }) => {

  const {t} = useTranslation();

  return (
    <>
      <div className={styles.root}>
        <img className={styles.image} alt='' src={blob ? URL.createObjectURL(blob) : avatar} />
      </div>

      <div className={`${styles.actions} ${!!blob ? styles.hasImage : ''}`}>
        <Button onClick={onEdit}>{t('COMMONS.EDIT')}</Button>
        {!!blob && <Button color='secondary' variant='outlined' onClick={onRemove}>{t('COMMONS.REMOVE')}</Button>}
      </div>
    </>
  );
};

export default AvatarView;