// Mock Axios for testing purposes
const Axios = {
    post: jest.fn(),
  };
  
  describe('LoginPage component unit tests', () => {
    let setEmail, setPassword, setRememberMe, onLogin, setError;
    let rememberMeState, storedEmail, storedPassword;
  
    beforeEach(() => {
      setEmail = jest.fn();
      setPassword = jest.fn();
      setRememberMe = jest.fn();
      onLogin = jest.fn();
      setError = jest.fn();
  
      localStorage.setItem = jest.fn();
      localStorage.removeItem = jest.fn();
  
      rememberMeState = false;
      storedEmail = '';
      storedPassword = '';
    });
  
    test('handleSubmit - successful login', async () => {
      const mockResponse = { data: { id: 1, name: 'John Doe' } };
      Axios.post.mockResolvedValueOnce(mockResponse);
  
      const email = 'test@example.com';
      const password = 'password';
  
      await handleSubmit({ preventDefault: jest.fn() });
  
      expect(Axios.post).toHaveBeenCalledWith('http://localhost:3001/login', {
        email,
        password,
      });
  
      expect(onLogin).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email,
      });
      expect(setError).not.toHaveBeenCalled();
    });
  
    test('handleSubmit - failed login', async () => {
      const errorMessage = 'Invalid credentials';
      Axios.post.mockRejectedValueOnce(new Error(errorMessage));
  
      await handleSubmit({ preventDefault: jest.fn() });
  
      expect(Axios.post).toHaveBeenCalled();
      expect(onLogin).not.toHaveBeenCalled();
      expect(setError).toHaveBeenCalledWith(errorMessage);
    });
  
    test('handleRememberMeChange - toggling remember me', () => {
      handleRememberMeChange();
  
      expect(setRememberMe).toHaveBeenCalledWith(!rememberMeState);
    });
  
    test('useEffect - remember me enabled', () => {
      localStorage.getItem = jest.fn().mockReturnValueOnce('true');
      localStorage.getItem.mockReturnValueOnce('test@example.com');
      localStorage.getItem.mockReturnValueOnce('password');
  
      useEffect();
  
      expect(setRememberMe).toHaveBeenCalledWith(true);
      expect(setEmail).toHaveBeenCalledWith('test@example.com');
      expect(setPassword).toHaveBeenCalledWith('password');
    });
  
    test('useEffect - remember me disabled', () => {
      localStorage.getItem = jest.fn().mockReturnValueOnce('false');
  
      useEffect();
  
      expect(setRememberMe).toHaveBeenCalledWith(false);
      expect(localStorage.removeItem).toHaveBeenCalledWith('email');
      expect(localStorage.removeItem).toHaveBeenCalledWith('password');
    });
  });
  