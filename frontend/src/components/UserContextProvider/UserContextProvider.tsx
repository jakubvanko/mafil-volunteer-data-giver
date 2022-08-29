import { createContext, PropsWithChildren, useContext, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/";

class UserContextObject {
  private token?: string;
  private id?: string;
  public expirationDate?: Date;
  public visitDate?: Date;
  public dataSize?: number;

  public login = async (emailToken: string, secret: string) => {
    const { token, id } = (
      await axios.post(
        "/users/tokens",
        { secret },
        { headers: { Authorization: `Bearer ${emailToken}` } }
      )
    ).data;
    this.token = token;
    this.id = id;
    const { expirationDate, visitDate, dataSize } = (
      await axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    this.expirationDate = new Date(Date.parse(expirationDate));
    this.visitDate = new Date(Date.parse(visitDate));
    this.dataSize = dataSize;
  };

  public logout = () => {
    this.token = undefined;
    this.id = undefined;
    this.expirationDate = undefined;
    this.visitDate = undefined;
    this.dataSize = undefined;
  };

  public downloadData = () => {
    const form = document.createElement("form");
    form.method = "post";
    form.target = "_blank";
    form.action = `${axios.defaults.baseURL}users/${this.id}/data`;
    form.innerHTML = `<input type="hidden" name="access_token" value="${this.token}">`;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  public deleteAccount = () => {
    console.log("deleting...");
    throw new Error("not implemented");
  };
}

const UserContext = createContext<UserContextObject>(new UserContextObject());

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userContextObject] = useState<UserContextObject>(
    new UserContextObject()
  );

  return (
    <UserContext.Provider value={userContextObject}>
      {children}
    </UserContext.Provider>
  );
};
