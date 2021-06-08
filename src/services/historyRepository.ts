import { TEMP_USER_ID } from 'constant';
import Repository from './repository';

const url = 'history';

const HistoryRepository = {
  /**
   * /GET. Get all histories
   * @param {number} limit the total records in response
   * @param {number} page the current page
   * @return {Array} the list of history
   */
  getAll: (limit: number, page: number): any =>
    Repository.get(`${url}?limmit=${limit}&page=${page}&userId=${TEMP_USER_ID}`)
};

export default HistoryRepository;
