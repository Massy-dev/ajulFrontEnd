import api from "../api/axios";

export const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/users/user_me/");
    return res.data;
  } catch (error) {
    console.error("Erreur récupération utilisateur:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("usernames");
  localStorage.removeItem("user_role");

  window.location.href = "/login";
};

export const verifLogin = async () => {
  const token = localStorage.getItem("access_token");
  if(!token){
    window.location.href = "/login";
  }
}

export const fetchTransaction = async (page = 1) => {
  const response = await api.get(`/transactions/?page=${page}`);
  return response.data;
};

export const fetchMemberTransaction = async (page = 1, id: number) => {
  const response = await api.get(`/transactions/userPaiment/?page=${page}&user=${id}` );
  return response.data;
};


export const fetchTotal = async (
  userId: number,
  //month: number,
  //year: number
) => {
  const res = await api.get(
    //`/transactions/total/?user=${userId}&month=${month}&year=${year}`
    `/transactions/total/?user=${userId}`
  );
  return res.data.total;
};


export const fetchCategorie = async (page = 1) => {
  const response = await api.get(`/categories/?page=${page}`);
  return response.data;
};

export const fetchUsers = async (page = 1) => {
  const response = await api.get(`/users/?page=${page}`);
  return response.data;
};

export const fetchRole = async (page = 1) => {
  const response = await api.get(`/roles/?page=${page}`);
  return response.data;
};

export const fetchCategoryStats = async () => {
  const res = await api.get("/transactions/stats/categories/");
  return res.data;
};

export const fetchTopMembers = async () => {
  const res = await api.get("/transactions/stats/top-members/");
  return res.data;
};