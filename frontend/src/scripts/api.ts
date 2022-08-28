import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/";

interface LoginResult {
  id: string;
  token: string;
}

export const login = async (
  token: string,
  secret: string
): Promise<LoginResult> =>
  (
    await axios.post(
      "/users/tokens",
      { secret },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ).data;

export interface UserDetails {
  id: string;
  expirationDate: Date;
  visitDate: Date;
  dataSize: number;
}

export const getUserDetails = async (
  token: string,
  userId: string
): Promise<UserDetails> => {
  const { id, expirationDate, visitDate, dataSize } = (
    await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
  return {
    id,
    expirationDate: new Date(Date.parse(expirationDate)),
    visitDate: new Date(Date.parse(visitDate)),
    dataSize,
  };
};

export const getUserData = async (token: string, id: string) => {
  const form = document.createElement("form");
  form.method = "post";
  form.target = "_blank";
  form.action = `${axios.defaults.baseURL}users/${id}/data`;
  form.innerHTML = `<input type="hidden" name="access_token" value="${token}">`;
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const deleteUser = async (token: string, id: string) => {
  console.log("deleting...");
  throw new Error("not implemented");
};
