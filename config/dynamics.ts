import * as dynamics from '../env-dynamics.mjs';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    __env__: typeof dynamics;
  }
}

export default typeof window !== 'undefined' ? window.__env__ : dynamics;
