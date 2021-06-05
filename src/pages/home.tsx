import { FC, useEffect, useState } from 'react';
import ProfileCard from 'components/profileCard';
import UserRepository from 'services/userRepository';
import { DEFAULT_API_PARAMS } from 'constant';

const Home: FC = () => {
  const { LIMIT, PAGE } = DEFAULT_API_PARAMS;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UserRepository.getAll(LIMIT, PAGE).then((data) => {
      console.log(data);
      setUsers(data.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="tinder-show">
      <ProfileCard {...users[0]} />
    </div>
  );
};


export default Home;
