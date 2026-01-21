import { makeAutoObservable,runInAction } from "mobx";
import axios from 'axios';
import { backendpath } from "../Constant/backendurl";

class UserStore {
  registeredUser = null;
  load=false;

  constructor() {
    makeAutoObservable(this);
  }
          
  registerUser(data) {
    //  console.log(data);
  
    this.registeredUser = data;
  }
  async storeregister(data){
   
    try{
     const res=await axios.post(`${backendpath}/userregister`,data);
     runInAction(()=>{
            console.log(res.data)
     }
    );

    }
    catch(err){
        runInAction(()=>{
        });
        console.log(err);
    }

  }
}

export const userStore = new UserStore();
