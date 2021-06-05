import { FC } from 'react';
import { ReactComponent as InfoButton } from 'assets/images/info.svg';

const InfoAction: FC = () => (
  <button className="no-border action-button with-shadow">
    <InfoButton />
  </button>
);

export default InfoAction;
