import { FC } from 'react';
import { ReactComponent as PassButton } from 'assets/images/pass.svg';

const PassAction: FC = () => (
  <button className="no-border action-button with-shadow">
    <PassButton />
  </button>
);

export default PassAction;
