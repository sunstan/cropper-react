import { useState } from 'react';

const useBoolean = (initialState?: boolean | (() => boolean)): readonly [boolean, {
  readonly on: () => void;
  readonly off: () => void;
  readonly toggle: () => void;
}] => {
  const [bool, setBool] = useState<boolean>(initialState || false);

  const on = () => setBool(true);

  const off = () => setBool(false);

  const toggle = () => setBool(state => !state);

  return [bool, {on, off, toggle}];
};

export default useBoolean;