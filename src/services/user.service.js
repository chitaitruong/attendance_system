import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getClassBoard = () => {
  return axios.get(API_URL + "giangvien/loptinchi", { headers: authHeader() });
};

const getDanhSachDiemDanhById = (id) => {
  return axios.get(API_URL + "diemdanh/" + id, { headers: authHeader(), });
};

const getLichByLopId = (id) => {
  return axios.get(API_URL + "giangvien/loptinchi/" + id + "/lich", { headers: authHeader() });
};

const getDiemDanhByLopIdAndLichId = (idLop, idLich) => {
  return axios.get(API_URL + "giangvien/loptinchi/" + idLop + "/lich/" + idLich + "/diemdanh", { headers: authHeader() });
};

const updateDiemDanh = async (diem_danh) => {
  return await axios.put(API_URL + "giangvien/diemdanh", diem_danh ,{ headers: authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getClassBoard,
  getDanhSachDiemDanhById,
  getLichByLopId,
  getDiemDanhByLopIdAndLichId,
  updateDiemDanh,
};

export default UserService;