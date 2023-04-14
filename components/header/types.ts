import { Dispatch, SetStateAction } from 'react';

export interface IHeaderProps {
  setOpenedSidebar: Dispatch<SetStateAction<boolean>>;
}
