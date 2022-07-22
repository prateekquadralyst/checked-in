import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HAS_LOGGED_IN = 'hasLoggedIn';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public storage: Storage) {}


  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
  };

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);

  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
  };

  setUsername(username) {
    this.storage.set('username', username);
  };

  getUsername() {
    // eslint-disable-next-line arrow-body-style
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    // eslint-disable-next-line arrow-body-style
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
}
