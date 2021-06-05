import { FC } from 'react';
import SlideShow from './slideShow';
import PassAction from './actions/pass';
import InfoAction from './actions/info';
import LikeAction from './actions/like';
import './profileCard.scss';

interface ProfileCardProps {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}
const ProfileCard: FC<ProfileCardProps> = ({ picture, firstName, lastName, title }) => {
  return (
    <div>
      <SlideShow
        images={['https://i.pinimg.com/originals/0b/3a/56/0b3a56ce1b5f0433f15a11115182b900.jpg']}
        userFullname={`${firstName} ${lastName}`} age={22} title={title} />
      <div className="actions">
        <PassAction />
        <InfoAction />
        <LikeAction />
      </div>
    </div>
  );
};

export default ProfileCard;
