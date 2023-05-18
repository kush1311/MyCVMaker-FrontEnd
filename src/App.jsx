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
import logController from "./utils/logController";
import { FullPageLoader } from "./components/AllLoaders/Loaders";
// import PdfMaker from "./components/PdfMaker/PdfMaker";
const PdfMaker = React.lazy(() => import("./components/PdfMaker/PdfMaker"));

axios.defaults.withCredentials = true;

logController();

export default class App extends Component {
  render() {
    return (
      <>
          <BrowserRouter>
            <GlobalContextApi>
              <AuthenticationApi>
                <Switch>
                  <React.Suspense fallback={<FullPageLoader/>}>
                    <Route path={FEEDBACK_ROUTE} exact component={Feedback} />
                    <Route path={LOGIN_ROUTE} exact component={Login} />
                    <Route path={REGISTER_ROUTE} exact component={Register} />
                    <Route path={HOME_ROUTE} exact component={Home} />
                    <Route exact path={RESUME_BUILDER_ROUTE} component={PdfMaker} />
                    <Route component={NotFound} />
                  </React.Suspense>
                </Switch>
              </AuthenticationApi>
            </GlobalContextApi>
          </BrowserRouter>
      </>
    );
  }
}
App.contextType = Context;
