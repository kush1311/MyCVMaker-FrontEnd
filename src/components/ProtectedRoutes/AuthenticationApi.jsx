import React from "react";

const AuthContext = React.createContext();
const Provider = AuthContext.Provider;
const Consumer = AuthContext.Consumer;

class AuthenticationApi extends React.Component {
  state = {
    isAuth: true,
  };
  authenticated = (isAuthenticated) => {
    this.setState({
      isAuth: isAuthenticated,
    });
  };

  render() {
    return (
      <Provider
        value={{
          isAuth: this.state.isAuth,
          authenticated: this.authenticated,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
export { AuthContext };
export default AuthenticationApi;
