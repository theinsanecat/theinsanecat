import { useEffect, useState } from 'react';
import { warmImage, isImageWarm } from '../lib/assetWarmup';

/** true once `src` is downloaded AND decoded (instantly true if it was warmed up earlier). */
export const useImageReady = (src) => {
  const [ready, setReady] = useState(() => isImageWarm(src));
  useEffect(() => {
    if (ready) return undefined;
    let alive = true;
    warmImage(src).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, [src, ready]);
  return ready;
};
