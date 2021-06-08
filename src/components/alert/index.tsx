import { FC } from 'react';
import './alert.scss';

interface AlertProps {
  type: String;
}
const Alert: FC<AlertProps> = ({ type }) => (
  <div className={`alert ${type}`}>
    {type}
  </div>
);

export default Alert;
