import Repository from './repository';

const url = 'user';

const UserRepository = {
  /**
   * /GET. Get all users
   * @param {number} limit the total records in response
   * @param {number} page the current page
   * @return {Array} the list of user
   */
  getAll: (limit: number, page: number) => Repository.get(`${url}?limmit=${limit}&page=${page}`),

  /**
   * /GET. Get user profile
   * @param {number} userId the user id
   * @return {Object} the user profile
   */
  getUserProfile: (userId: number) => Repository.get(`${url}/${userId}`)
};

export default UserRepository;
