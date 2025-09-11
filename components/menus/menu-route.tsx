import { MenuItem } from './menu-item';
import { ChevronRightIcon } from 'lucide-react';
import { Observable } from '@legendapp/state';
import { Memo, Show } from '@legendapp/state/react';
import { BaseMenu } from '@/components/menus/types';

export const MenuRoute = ({
  icon,
  label,
  route,
  sub_label$,
  menu$,
  sub_label_postfix,
  sub_label_placeholder,
}: {
  icon?: React.ReactNode;
  label: string;
  route?: string;
  menu$: Observable<BaseMenu>;
  sub_label$?: Observable<string>;
  sub_label_postfix?: string;
  sub_label_placeholder?: string;
}) => {
  return (
    <MenuItem onClick={() => menu$.go_to(route || label)}>
      {icon}
      <span className="w-full text-left">{label}</span>
      <span className="text-secondary capitalize whitespace-nowrap">
        <Show if={sub_label$} else={sub_label_placeholder}>
          <Memo>{sub_label$}</Memo>
          <Show if={sub_label_postfix}>{sub_label_postfix}</Show>
        </Show>
      </span>
      <ChevronRightIcon className="text-secondary" />
    </MenuItem>
  );
};
