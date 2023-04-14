import React, { ForwardedRef, forwardRef } from 'react';

import { ModalExtraStyle } from './ModalExtraStyles';
import { ModalExtraProps } from './types';

const ModalExtra = (
  props: ModalExtraProps,
  ref?: ForwardedRef<HTMLDivElement>,
) => <ModalExtraStyle {...props} ref={ref} />;

export default forwardRef(ModalExtra);
