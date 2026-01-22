import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { backendpath } from "../Constant/backendurl";
import { useNavigate } from "react-router-dom";

class UserStore {
  registeredUser = null;
  user = null;
  loading = false;
  error = null;
  

  constructor() {
    makeAutoObservable(this);
  }

  registerUser(data) {
    this.registeredUser = data;
  }

  async storeregister(data) {
    this.loading = true;
    this.error = null;

    try {
      const res = await axios.post(`${backendpath}/userregister`, data);

      runInAction(() => {
        this.registeredUser = res.data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Registration failed";
        this.loading = false;
      });
    }
  }

  async loginUser(data,navigate) {
    this.loading = true;
    this.error = null;

    try {
      const res = await axios.post(`${backendpath}/userlogin`, data);

      runInAction(() => {
        this.user = res.data;
        this.loading = false;

        
        localStorage.setItem("user", JSON.stringify(res.data));
        if(navigate){
          navigate('/dashboard');
        }
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Login failed";
        this.loading = false;
      });
    }
  }

    
}

export const userStore = new UserStore();
