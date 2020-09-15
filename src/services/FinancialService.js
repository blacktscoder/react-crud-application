import http from "../http-common";

const getAll = () => {
  return http.get("/financial");
};

const get = id => {
  return http.get(`/financial/${id}`);
};

const create = data => {
  return http.post("/financial", data);
};

const update = (id, data) => {
  return http.put(`/financial/${id}`, data);
};

const remove = id => {
  return http.delete(`/financial/${id}`);
};

const removeAll = () => {
  return http.delete(`/financial`);
};

const findByTitle = title => {
  return http.get(`/financial?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};