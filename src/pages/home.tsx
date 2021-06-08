import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const timerRef = useRef<number | null>(null);
  const [appState, applicationActions] = useApplicationStore();

  const fetchUser = (page: number, callback: Function): void => {
    UserRepository.getAll(LIMIT, page).then((data: UserListResponse) => {
      applicationActions.onLoadTotalPage(data?.totalPages);
      callback(data?.data);
    }).catch((error: AnyObject) => {}).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchUser(appState.currentPage || PAGE, setUsers);
  }, []);

  useLayoutEffect(() => {
    if (appState.currentItemIndex === NEED_TO_FETCH_MORE) {
      // Preload data.
      const newPage = appState.currentPage + 1;
      applicationActions.onChangePage(newPage);
      fetchUser(newPage, setTempUsers);
    }
    // Remove interacted item from list
    if (users.length && appState.currentItemIndex > DEFAULT_INDEX) {
      timerRef.current = window.setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((_, i) => i !== DEFAULT_INDEX));
      }, 400);
    }
    if (appState.currentItemIndex === users.length && appState.currentPage <= appState.totalPage) {
      // Set item index to zero
      applicationActions.onChangeItemIndex(DEFAULT_INDEX);
      // Replace new data here
      setUsers(tempUsers);
    }
    return () => {
      window.clearTimeout(timerRef.current || 0);
    };
  }, [appState.currentItemIndex]);

  return (
    <div className="tinder-show">
      {loading ? <Loading /> : <Card userList={users} />}
    </div>
  );
};


export default Home;
