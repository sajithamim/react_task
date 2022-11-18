import React from "react";

const Header = () => {
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4">Company Name</div>
            <div className="col-lg-6 col-sm-12">
              <form action="#" className="search">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
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
                  <button className="createBtn">Create Event</button>
                </div>
                <div className="widget-header icontext">
                  <a href="#" className="icon icon-sm rounded-circle border">
                    <i className="fa fa-user" />
                  </a>
                  <div className="text">
                    <span className="text-muted">Welcome!</span>
                   
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
