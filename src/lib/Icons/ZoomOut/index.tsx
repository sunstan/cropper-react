import { SVGProps } from 'react';

const ZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="m21 21l-6-6m2-5a7 7 0 1 1-14 0a7 7 0 0 1 14 0Zm-4 0H7"/>
  </svg>
);

export default ZoomOut;