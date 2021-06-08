import { FC, useEffect, useState } from 'react';
import HistoryRepository from 'services/historyRepository';
import Loading from 'components/loading';
import SlideShow from 'components/profileCard/slideShow';
import { HistoryListResponse, UserHistory } from 'interface/user';
import { DEFAULT_API_PARAMS } from 'constant';
import { AnyObject, Pagination } from 'constant/types';

const Profile: FC = () => {
  const { LIMIT, PAGE } = DEFAULT_API_PARAMS;
  const [paging, setPaging] = useState<Pagination>({ totalPages: 1, currentPage: 1 });
  const [histories, setHistory] = useState<UserHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = (page: number) => {
    HistoryRepository.getAll(LIMIT, page).then((data: HistoryListResponse) => {
      setHistory(data?.data);
      setPaging({ totalPages: data.totalPages, currentPage: page });
    }).catch((error: AnyObject) => {}).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(PAGE);
  }, []);

  const handleChangePage = (page: number) => {
    setLoading(true);
    fetchData(page);
  };

  return (
    <>
      {loading ? <Loading /> :
        <>
          <div className="profile-page">
            {histories.map((history: UserHistory) => (
              <SlideShow
                customClass="history-card"
                key={history.id}
                user={history.interactedUser}
                reaction={history.reaction}
                noneAnimation
              />
            ))}
          </div>
          <ul className="pagination">
            {Array.from(new Array(paging.totalPages)).map((_, index: number) => (
              <li key={index}>
                <button
                  disabled={index === paging.currentPage - 1}
                  onClick={() => handleChangePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </>
      }
    </>
  );
};

export default Profile;
