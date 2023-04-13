import { Dispatch, SetStateAction } from 'react';

export interface ISidebarProps {
  opened: boolean;
  setOpenedSidebar: Dispatch<SetStateAction<boolean>>;
}
