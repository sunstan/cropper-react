import React, { useEffect, useRef, useState } from 'react';
import AvatarView from './components/AvatarView';
import useBoolean from 'core/hooks/useBoolean';
import EditView from './components/EditView';
import { IMAGE_WIDTH } from './core/contants';

const App = () => {

  const [edit, setEdit] = useBoolean();
  const [blob, setBlob] = useState<Blob>();
  const [maxWidth, setMaxWidth] = useState<number>(IMAGE_WIDTH);

  const ref = useRef<HTMLDivElement>(null);

  const onSave = (blob: Blob) => {
    setBlob(blob);
    setEdit.off();
  };

  const onCancel = () => {
    setEdit.off();
  };

  const onRemove = () => {
    setBlob(undefined);
  };

  useEffect(() => {
    const onResize = () => {
      if (!ref.current) return;
      const padding = window.getComputedStyle(ref.current).padding;
      const maxWidth = window.innerWidth - parseInt(padding) * 2;
      setMaxWidth(maxWidth);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div ref={ref} className='flex flex-col items-center justify-center gap-10 p-6 min-h-screen dark:bg-slate-900'>
      {edit
        ? <EditView maxWidth={maxWidth} onCancel={onCancel} onSave={onSave} />
        : <AvatarView blob={blob} onEdit={setEdit.on} onRemove={onRemove} />}
    </div>
  )
};

export default App;
