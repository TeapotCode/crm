import { AuthService } from './auth.service';
describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('login()', () => {
    it('should set localstorage on login call', () => {
      let localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
      authService.login();
      expect(localStorageSpy).toHaveBeenNthCalledWith(1, authService.key, '1');
    });

    it('isLoggedIn should be true after login call', () => {
      authService.login();
      expect(authService.isLoggedIn()).toBe(true);
    });
  });

  describe('logout()', () => {
    it('should remove storage on login call', () => {
      let localStorageSpy = jest.spyOn(Storage.prototype, 'removeItem');
      authService.logout();
      expect(localStorageSpy).toHaveBeenNthCalledWith(1, authService.key);
    });

    it('isLoggedIn should be true after login call', () => {
      authService.logout();
      expect(authService.isLoggedIn()).toBe(false);
    });
  });

  it('should be true if loggedIn on app start', () => {
    let localStorageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => '1');

    const newAuth = new AuthService();

    expect(newAuth.isLoggedIn()).toBe(true);
  });
});
