import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = ({handleSearch}) => {
  const username = sessionStorage.getItem("username");
  const { state } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const navigateLogin = () => {
    username ? navigate("/add_events") : navigate("/login");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    signOut(auth)
      .then(navigate("/")) // undefined
      .catch((error) => alert(error));
  };

  const email = username ? username.substring(0, username.indexOf("@")) : "";
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row ">
            {/* <div className="col-lg-2 col-4"></div> */}
            <div className="col-lg-8 col-sm-12">
              <form action="#" className="search">
                <div className="input-group w-50" style={{margin: '0px 302px'}}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Events"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="widgets-wrap float-md-right">
                <div className="widget-header  mr-3">
                  <button onClick={navigateLogin} className="createBtn">
                    Create Event
                  </button>
                </div>
                <div className="widget-header icontext">
                  <a href="#" className="icon icon-sm rounded-circle border">
                    <i className="fa fa-user" />
                  </a>
                  <div className="text">
                    <span className="text-muted">Welcome {email}</span>
                    {!username ? (
                      <div>
                        <a href="/login"> Login</a>
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      {username && username ? (
                        <a href="#" onClick={handleLogout}>
                          Sign Out
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
