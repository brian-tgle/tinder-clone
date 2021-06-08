import ProfileCard from 'components/profileCard';
import { UserItem } from 'interface/user';
import { FC } from 'react';

interface CardProps {
  userList: UserItem[];
}
const Card: FC<CardProps> = ({ userList }) => {
  return (
    <>
      {userList.length ? userList.map((user: UserItem, index: number) => (
        <ProfileCard key={user.id} userId={user.id} index={index} />
      )) : <p>You have viewed all user!</p>}
    </>
  );
};

export default Card;
