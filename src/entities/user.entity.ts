export class User {
  private _username: string;
  private avatar: string;

  constructor(username: string, avatar: string) {
    this._username = username;
    this.avatar = avatar;
  }

  get username() {
    return this._username;
  }
}
