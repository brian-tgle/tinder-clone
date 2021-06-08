import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { UserItem, UserListResponse } from 'interface/user';
import UserRepository from 'services/userRepository';
import useApplicationStore from 'store/application';
import Loading from 'components/loading';
import Card from 'components/card';
import { DEFAULT_API_PARAMS } from 'constant';
import { AnyObject } from 'constant/types';

const Home: FC = () => {
  const { LIMIT, PAGE, NEED_TO_FETCH_MORE, DEFAULT_INDEX } = DEFAULT_API_PARAMS;
  const [users, setUsers] = useState<UserItem[]>([]);
  const [tempUsers, setTempUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [appState, applicationActions] = useApplicationStore();

  const fetchUser = (callback: Function, skip = 0): void => {
    UserRepository.getAll(LIMIT, PAGE, skip).then((data: UserListResponse) => {
      applicationActions.onLoadTotalPage(data?.totalPages);
      callback(data?.data);
    }).catch((error: AnyObject) => {}).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchUser(setUsers);
  }, []);

  useEffect(() => {
    // Prepare more data when interacted within 3 users.
    if (appState.currentItemIndex === NEED_TO_FETCH_MORE) {
      fetchUser(setTempUsers, 2);
    }
    // Remove interacted item from list after 0.4s of animation (fade out)
    if (users.length && appState.currentItemIndex > DEFAULT_INDEX) {
      const timer = setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((_, i) => i !== DEFAULT_INDEX));
      }, 400);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [appState.currentItemIndex]);

  useLayoutEffect(() => {
    if (users.length === 0 && tempUsers.length) {
      // Set item index to zero.
      applicationActions.onChangeItemIndex(DEFAULT_INDEX);
      // Replace by new data.
      setUsers(tempUsers);
      // Remove temp data.
      setTempUsers([]);
    }
  }, [users]);

  return (
    <div className="tinder-show">
      {loading ? <Loading /> : <Card userList={users} />}
    </div>
  );
};


export default Home;
