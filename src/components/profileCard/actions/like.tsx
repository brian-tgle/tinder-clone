import { FC } from 'react';
import { ReactComponent as LikeButton } from 'assets/images/like.svg';
import './action.scss';

const LikeAction: FC = () => (
  <button className="no-border action-button with-shadow">
    <LikeButton />
  </button>
);

export default LikeAction;
