import i18n, { langs, LanguagesAvailable } from 'core/i18n';
import { patchAppState } from 'core/store/app/app.actions';
import useClickOutside from 'core/hooks/useClickOutside';
import { appState } from 'core/store/app/app.selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import useBoolean from 'core/hooks/useBoolean';
import styles from './SwitchLang.module.css';
import { Globe } from 'lib/Icons';

const SwitchLang: React.FC = () => {

  const ref = useRef(null);
  const dispatch = useDispatch();
  const { lang } = useSelector(appState);
  const [show, setShow] = useBoolean();

  const onClick = (lang: LanguagesAvailable) => {
    dispatch(patchAppState({ lang }));
    setShow.off();
  };

  useClickOutside(ref, setShow.off);

  useEffect(() => {
    i18n.changeLanguage(lang).then();
  }, [lang]);

  return (
    <div className={styles.root}>
      <Globe onClick={setShow.toggle} className={styles.icon} />
      {show && (

        <div ref={ref} className={styles.container}>
          {langs.map((lang, i) => (
            <div key={i} onClick={() => onClick(lang)} className={styles.item}>
              <span>{lang.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwitchLang;