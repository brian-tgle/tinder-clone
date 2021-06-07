import { FC, useState } from 'react';
import useApplicationStore from 'store/application';
import SlideShow from './slideShow';
import Action from './actions';
import { ReactComponent as PassButton } from 'assets/images/pass.svg';
import { ReactComponent as LikeButton } from 'assets/images/like.svg';
import { ReactComponent as InfoButton } from 'assets/images/info.svg';
import { UserReaction } from 'interface/user';
import UserRepository from 'services/userRepository';
import { REACTION_TYPES, TEMP_USER_ID } from 'constant';
import './profileCard.scss';

interface ProfileCardProps {
  userId: string;
  index: number;
}
const ProfileCard: FC<ProfileCardProps> = ({ userId, index }) => {
  const { PASS, LIKE } = REACTION_TYPES;
  const [reaction, setReaction] = useState<string>('');
  const [applicationState, applicationActions] = useApplicationStore();

  const handleReaction = (reaction: string) => {
    setReaction(reaction);
    const payload: UserReaction = {
      userId: TEMP_USER_ID,
      interactedUserId: userId,
      reaction
    };
    UserRepository.reaction(payload).then(() => {
      applicationActions.onChangeItemIndex(applicationState.currentItemIndex + 1);
    }).catch(() => {});
  };

  return (
    <>
      {index === 0 ? <div>
        <SlideShow userId={userId} reaction={reaction} />
        <div className="actions">
          <Action handleClick={() => handleReaction(PASS)}>
            <PassButton />
          </Action>
          {/* TODO: Out of scope, implement later. */}
          <Action handleClick={() => {}}>
            <InfoButton />
          </Action>
          <Action handleClick={() => handleReaction(LIKE)}>
            <LikeButton />
          </Action>
        </div>
      </div> : <></>}
    </>
  );
};

export default ProfileCard;
