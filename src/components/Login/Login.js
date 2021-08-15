import React, { Component } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import ButtonSpinner from "../../common/ButtonSpinner";
import { withTranslation } from "react-i18next";
import "./login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      isChecked: false,
      errors: "",
    };
  }
  componentDidMount() {
    document.title = this.props.t(
      "Food App - Admin panel"
    );
    this.props.i18n.changeLanguage(window.navigator.language);
    if (this.props.auth.isAuthenticated) {
      this.redirectUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.redirectUser();
    }
    if (nextProps.errors) {
      if (
        nextProps.errors.errors &&
        nextProps.errors.errors.error === "Unauthorised"
      ) {
        this.setState({ errors: nextProps.errors.errors });
      }
    }
    this.setState({ isLoading: false });
  }

  redirectUser() {
    this.props.history.push("/db/home");
  }

  shouldComponentUpdate() {
    return true;
  }

  onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  };

  onSubmit = (e) => {
      console.log('some data');
    e.preventDefault();
    this.setState({ isLoading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      grant_type: "password",
    };
    this.props.loginUser(userData);
  };
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        {/* <h4>{window.navigator.language}</h4> */}

        <div className="loginWrapper">
          <div className="card-body verticalMiddle text-center">
            <div className="verticalMiddle_">
              <div className="winDiv">
                {this.state.errors ? (
                  <div className="alert alert-danger login-alert" role="alert">
                    {t("Invalid Login Credentials!")}
                  </div>
                ) : (
                  ""
                )}

                <form className="formWrapper" onSubmit={this.onSubmit}>
                  <div className="text-center my-4">
                    <div className="custom-control custom-checkbox">
                      
                      <label
                        className="custom-control-label text-thin"
                        htmlFor="customCheck"
                      >
                      Admin Login
                      </label>
                    </div>
                  </div>

                  <div className="inner-addon left-addon">
                    <i className="fas fa-user form-control-feedback"></i>
                    <input
                      type="text"
                      className="form-control mb-3 text-thin"
                      placeholder={t("Username")}
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="inner-addon left-addon">
                    <i className="fas fa-lock form-control-feedback"></i>
                    <input
                      type="password"
                      className="form-control mb-3 text-thin"
                      placeholder={t("Password")}
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      autoComplete="true"
                    />
                  </div>

                  {/* <div className="text-center my-4">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.onChange} className="custom-control-input" id="customCheck" />
                                            <label className="custom-control-label text-thin" htmlFor="customCheck">{t('Remember me')}</label>
                                        </div>
                                    </div> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg  btn-login"
                  >
                    {this.state.isLoading ? <ButtonSpinner /> : t("Sign in")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default withTranslation()(
  connect(mapStateToProps, { loginUser })(Login)
);
