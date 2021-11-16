import { getToken } from "../../../../../MKBL/client/src/common/helpers"
import { POSTS_URL } from "../../common/constants"

export const getSinglePostRequest = async (id = 0) => {

  try {
    const response = await fetch(`${POSTS_URL}/${id}`, {
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