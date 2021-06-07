import { FC, MouseEvent } from 'react';
import { ActionProps } from 'constant/types';
import './action.scss';

const Action: FC<ActionProps> = ({ handleClick, children }) => {
  const onButtonClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    handleClick();
  };
  return (
    <button className="no-border action-button with-shadow" onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default Action;
