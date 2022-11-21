import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

interface UserContextObject {
  token?: string;
  id?: string;
  expirationDate?: Date;
  visitDate?: Date;
  dataSize?: number;
  login: (emailToken: string, secret: string) => Promise<void>;
  logout: () => void;
  downloadData: () => void;
  isEmailToken: (string: string) => boolean;
  deleteAccount: () => Promise<any>;
  requestSMSCode: (emailToken: string) => Promise<any>;
  reloadLoginDetails: (emailToken: string) => Promise<any>;
  isReloadPending: boolean;
  leftSMSAmount?: number;
  secretExpirationDate?: Date;
  secretTryAmount?: number;
}

const UserContext = createContext<UserContextObject>({
  login: () => Promise.resolve(),
  logout: () => {},
  downloadData: () => {},
  isEmailToken: () => false,
  deleteAccount: () => Promise.resolve(),
  requestSMSCode: () => Promise.resolve(),
  reloadLoginDetails: () => Promise.resolve(),
  isReloadPending: false,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();
  const [id, setId] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [visitDate, setVisitDate] = useState<Date>();
  const [dataSize, setDataSize] = useState<number>();
  const [isReloadPending, setReloadPending] = useState<boolean>(true);
  const [leftSMSAmount, setLeftSMSAmount] = useState<number>();
  const [secretExpirationDate, setSecretExpirationDate] = useState<Date>();
  const [secretTryAmount, setSecretTryAmount] = useState<number>();

  const reloadUserDetails = async (token: string, id: string) => {
    const { expirationDate, visitDate, dataSize } = (
      await axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    setExpirationDate(new Date(Date.parse(expirationDate)));
    setVisitDate(new Date(Date.parse(visitDate)));
    setDataSize(dataSize);
  };

  const reloadLoginDetails = async (emailToken: string) => {
    const { leftSMSAmount, secretExpirationDate, secretTryAmount } = (
      await axios.get(`/users/secrets/details`, {
        headers: { Authorization: `Bearer ${emailToken}` },
      })
    ).data;
    setLeftSMSAmount(leftSMSAmount);
    setSecretExpirationDate(new Date(Date.parse(secretExpirationDate)));
    setSecretTryAmount(secretTryAmount);
  };

  const login = async (emailToken: string, secret: string) => {
    const { token, id } = (
      await axios.post(
        "/users/tokens",
        { secret },
        { headers: { Authorization: `Bearer ${emailToken}` } }
      )
    ).data;
    setToken(token);
    setId(id);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("id", id);
    await reloadUserDetails(token, id);
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(undefined);
    setId(undefined);
    setExpirationDate(undefined);
    setVisitDate(undefined);
    setDataSize(undefined);
  };

  /* The followning function is inspired by Joren Van Severen.
   *
   * JOREN VAN SEVEREN. How to handle file downloads with JWT based authentication?
   * [StackOverflow answer (https://stackoverflow.com/a/66078703)]. 2021.
   */
  const downloadData = () => {
    const form = document.createElement("form");
    form.method = "post";
    form.target = "_blank";
    form.action = `${axios.defaults.baseURL}users/${id}/data`;
    form.innerHTML = `<input type="hidden" name="access_token" value="${token}">`;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const deleteAccount = async () => {
    await axios.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    logout();
  };

  const isEmailToken = (string: string) => {
    try {
      return jwt_decode<any>(string)._id !== undefined;
    } catch {
      return false;
    }
  };

  const requestSMSCode = async (emailToken: string) => {
    try {
      await axios.get(`/users/secrets`, {
        headers: { Authorization: `Bearer ${emailToken}` },
      });
    } catch (error) {
      throw error;
    } finally {
      await reloadLoginDetails(emailToken);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    if (token !== null && id !== null) {
      setToken(token);
      setId(id);
      reloadUserDetails(token, id);
    }
    setReloadPending(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        id,
        expirationDate,
        visitDate,
        dataSize,
        login,
        logout,
        downloadData,
        deleteAccount,
        isEmailToken,
        requestSMSCode,
        reloadLoginDetails,
        isReloadPending,
        leftSMSAmount,
        secretExpirationDate,
        secretTryAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
