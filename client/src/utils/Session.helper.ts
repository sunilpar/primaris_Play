interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

class CurrentUser {
  private storageKey = "currentUser";

  putData(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getData(): User | null {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  isLogged(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

const currentUser = new CurrentUser();
export default currentUser;
