import { getToken } from "../../../../../MKBL/client/src/common/helpers"
import { POSTS_URL } from "../../common/constants"

export const reactToPostRequest = async (id = 0, reaction = 0) => {

  try {
    const response = await fetch(`${POSTS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reaction),
      headers: {
        'authorization': `Bearer ${getToken()}`
      }
    });
  
    const post = await response.json();

    return post;
  } catch (error) {
    return error;
  }  
}