import { FC, useEffect, useState } from 'react';
import UserRepository from 'services/userRepository';
import Alert from 'components/alert';
import { calculateAge } from 'utils/date';
import { UserProfile } from 'interface/user';
import { ReactComponent as NextButton } from 'assets/images/next.svg';
import { ReactComponent as BackButton } from 'assets/images/back.svg';
import './slideShow.scss';

interface SlideShowProps {
  userId: string;
  reaction: string;
}

const SlideShow: FC<SlideShowProps> = ({ userId, reaction }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  useEffect(() => {
    UserRepository.getUserProfile(userId).then((profile) => {
      setUserProfile(profile.data);
    }).catch(() => {});
  }, [userId]);

  return (
    <>
      {userProfile ?
        <div
          className={`slide-show with-border-radius with-shadow fade-in ${reaction}`}
          style={{
            backgroundImage: `linear-gradient(
            rgba(0,0,0, 0),
            rgba(0,0,0, 50)
          ), url(${userProfile?.picture})`
          }}>
          <div className="text-center total-images">1 of 1</div>
          <div className="change-image-actions">
            <button className="no-border no-bg">
              <BackButton />
            </button>
            {reaction && <Alert type={reaction} />}
            <button className="no-border no-bg">
              <NextButton />
            </button>
          </div>
          <h1 className="name">{userProfile?.firstName} {userProfile?.lastName} ({userProfile?.title})</h1>
          <h2 className="email">{userProfile?.email}</h2>
          <p className="phone">Phone: {userProfile?.phone}</p>
          <p className="age">Age: {calculateAge(userProfile?.dateOfBirth)}</p>
          <p className="gender">{userProfile?.gender}</p>
        </div> : <></>
      }
    </>
  );
};

export default SlideShow;
