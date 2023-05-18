import React, { Component } from "react";
import GlobalContextApi, {
  Context,
} from "./components/GlobalContextApi/GlobalContextApi";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import AuthenticationApi from "./components/ProtectedRoutes/AuthenticationApi";
import { FEEDBACK_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, RESUME_BUILDER_ROUTE } from "./constants/routes";
import logController from "./utils/logController";
import { FullPageLoader } from "./components/AllLoaders/Loaders";
const Home = React.lazy(() => import("./components/Home/Home"));
const Feedback = React.lazy(() => import("./components/Feedback/Feedback"));
const Login = React.lazy(() => import("./components/Home/Account/Login"));
const Register = React.lazy(() => import("./components/Home/Account/Register"));
const PdfMaker = React.lazy(() => import("./components/PdfMaker/PdfMaker"));
const NotFound = React.lazy(() => import("./components/NotFound"));

axios.defaults.withCredentials = true;

logController();

export default class App extends Component {
  render() {
    return (
      <>
          <BrowserRouter>
            <GlobalContextApi>
              <AuthenticationApi>
                  <React.Suspense fallback={<FullPageLoader/>}>
                    <Switch>
                      <Route path={FEEDBACK_ROUTE} exact component={Feedback} />
                      <Route path={LOGIN_ROUTE} exact component={Login} />
                      <Route path={REGISTER_ROUTE} exact component={Register} />
                      <Route path={HOME_ROUTE} exact component={Home} />
                      <Route exact path={RESUME_BUILDER_ROUTE} component={PdfMaker} />
                      <Route component={NotFound} />
                    </Switch>
                  </React.Suspense>
              </AuthenticationApi>
            </GlobalContextApi>
          </BrowserRouter>
      </>
    );
  }
}
App.contextType = Context;
