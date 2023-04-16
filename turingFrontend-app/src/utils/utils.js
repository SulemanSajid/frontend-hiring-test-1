import axios from "axios";

const baseUrl = "https://frontend-test-api.aircall.io";

export const siginCall = async (userName, password) => {
  return await axios.post(`${baseUrl}/auth/login`, {
    username: userName,
    password: password,
  });
};

export const refreshCall = async () => {
  debugger;
  return await axios.post(
    `${baseUrl}/auth/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const getData = async () => {
  return await axios.get(`${baseUrl}/calls`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const getPaginationData = async (offset) => {
  return await axios.get(`${baseUrl}/calls?offset=${offset}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const addNote = async (id, note) => {
  return await axios.post(
    `${baseUrl}/calls/${id}/note`,
    { content: note },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const archiveCall = async (id) => {
  return await axios.put(
    `${baseUrl}/calls/${id}/archive`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
