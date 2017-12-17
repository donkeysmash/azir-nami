import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { logoutRequest } from 'Features/Auth/actions';
import styles from './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickLogo = this.handleClickLogo.bind(this);
  }

  handleClickLogo() {
    this.props.redirectTo('/');
  }

  handleClickLogout() {
    this.props.logout();
  }

  render() {
    const { isAuthorized, username } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.logo} onClick={this.handleClickLogo}>
          REACHAF
        </div>
        <div className={styles.right}>
          {isAuthorized ? (
            <div>
              <div className={styles.username}>{username}</div>
              <div className={styles.logout} onClick={this.handleClickLogout}>
                Logout
              </div>
            </div>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.auth.access.isAuthorized,
  username: state.auth.user.username
});

const mapDistpatchToProps = dispatch => ({
  logout: bindActionCreators(logoutRequest, dispatch),
  redirectTo: bindActionCreators(push, dispatch)
});

export default connect(mapStateToProps, mapDistpatchToProps)(Header);