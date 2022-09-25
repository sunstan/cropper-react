import SwitchDarkMode from '../../containers/SwitchDarkMode';
import styles from './Header.module.css';
import SwitchLang from '../../containers/SwitchLang';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <SwitchLang />
      <SwitchDarkMode />
    </div>
  );
};

export default Header;
