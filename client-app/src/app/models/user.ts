export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
 }
 
 export interface UserFormValues {
     username?: string;
     email: string;
     password: string;
     displayName?: string;
  }