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
                  <Route path='/feedback' exact component={Feedback} />
                  <Route path='/login' exact component={Login} />
                  <Route path='/register' exact component={Register} />
                  <Route path='/' exact component={Home} />
                  <Suspense fallback={<Loading />}>
                    <Route exact path='/resume-builder' component={PdfMaker} />
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
