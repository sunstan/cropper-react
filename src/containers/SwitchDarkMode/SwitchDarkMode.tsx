import { toggleDarkMode } from 'core/store/app/app.actions';
import { appState } from 'core/store/app/app.selectors';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SwitchDarkMode.module.css';
import React, { useEffect } from 'react';
import { Moon, Sun } from 'lib/Icons';

const SwitchDarkMode: React.FC = () => {

  const dispatch = useDispatch();
  const { darkMode } = useSelector(appState);

  const onClick = () => {
    dispatch(toggleDarkMode())
  };

  useEffect(() => {
    document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
  }, [darkMode]);

  return (
    <div className={styles.root} onClick={onClick}>
      {darkMode ? <Moon className={styles.icon} /> : <Sun className={styles.icon} />}
    </div>
  );
};

export default SwitchDarkMode;
