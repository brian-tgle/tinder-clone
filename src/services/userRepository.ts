import { TEMP_USER_ID } from 'constant';
import { UserReaction } from 'interface/user';
import Repository from './repository';

const url = 'user';

const UserRepository = {
  /**
   * /GET. Get all users
   * @param {number} limit the total records in response
   * @param {number} page the current page
   * @return {Array} the list of user
   */
  getAll: (limit: number, page: number): any =>
    Repository.get(`${url}?limmit=${limit}&page=${page}&userId=${TEMP_USER_ID}`),

  /**
   * /GET. Get user profile
   * @param {number} userId the user id
   * @return {Object} the user profile
   */
  getUserProfile: (userId: string) => Repository.get(`${url}/${userId}`),

  /**
   * Mark a user as liked or not liked
   * @param {UserReaction} payload Reaction data payload
   * @return {UserReaction} Response
   */
  reaction: (payload: UserReaction) => Repository.post(`${url}/${payload.reaction}`, payload)
};

export default UserRepository;
