import React, { Component, Suspense } from "react";
import GlobalContextApi, {
  Context,
} from "./components/GlobalContextApi/GlobalContextApi";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import "./App.css";
import Feedback from "./components/Feedback/Feedback";
import Login from "./components/Home/Account/Login";
import Register from "./components/Home/Account/Register";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import AuthenticationApi from "./components/ProtectedRoutes/AuthenticationApi";
import { FEEDBACK_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, RESUME_BUILDER_ROUTE } from "./constants/routes";
// import PdfMaker from "./components/PdfMaker/PdfMaker";
const PdfMaker = React.lazy(() => import("./components/PdfMaker/PdfMaker"));
const Loading = () => {
  return <div className='h-screen text-center'> Loading...... </div>;
};
axios.defaults.withCredentials = true;
export default class App extends Component {
  render() {
    return (
      <>
        <React.Suspense fallback={<Loading />}>
          <BrowserRouter>
            <GlobalContextApi>
              <AuthenticationApi>
                <Switch>
                  <Route path={FEEDBACK_ROUTE} exact component={Feedback} />
                  <Route path={LOGIN_ROUTE} exact component={Login} />
                  <Route path={REGISTER_ROUTE} exact component={Register} />
                  <Route path={HOME_ROUTE} exact component={Home} />
                  <Suspense fallback={<Loading />}>
                    <Route exact path={RESUME_BUILDER_ROUTE} component={PdfMaker} />
                  </Suspense>
                  <Route component={NotFound} />
                </Switch>
              </AuthenticationApi>
            </GlobalContextApi>
          </BrowserRouter>
        </React.Suspense>
      </>
    );
  }
}
App.contextType = Context;
