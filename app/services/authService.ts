import Backendless from './backendless';

export const registerUser = async (email: string, password: string, name: string) => {
    console.log("registerUser function called with:", email, password, name); // Debugging log
    try {
      const user = new Backendless.User();
      user.email = email;
      user.password = password;
      user.name = name;
      return await Backendless.UserService.register(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const loginUser = async (email: string, password: string) => {
    try {
      return await Backendless.UserService.login(email, password, true);
    } catch (error) {
        if (error.code === 3003) {
          throw new Error('Invalid email or password. Please try again.');
        } else {
          throw new Error(error.message);
        }
      }
    };
  
  export const logoutUser = async () => {
    try {
      await Backendless.UserService.logout();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getCurrentUser = async () => {
    try {
      return await Backendless.UserService.getCurrentUser();
    } catch (error) {
      return null;
    }
  };