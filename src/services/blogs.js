import axios from "axios";
const baseUrl = "/api/blogs";
const userUrl = "api/users"

let token = null;

//SET TOKEN for AUTH
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//GET Method
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//POST Method CREATE
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

//PUT Method
const like = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  };

  let newUrl = `${baseUrl}/${id}`;
  const response = await axios.put(newUrl, newObject, config);
  return response.data;
};

//DELETE Method only by User who create Blog
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  let newUrl = `${baseUrl}/${id}`;
  const response = await axios.delete(newUrl, config);
  return response.data;
};

//get users
const getUsers = () => {
  const request = axios.get(userUrl);
  return request.then((response) => response.data)
}

export default { getAll, create, setToken, like, deleteBlog, getUsers };
