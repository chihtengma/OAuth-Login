import React from "react";

const Login = () => {
   return (
      <div className="box">
         <div className="content">
            <div className="login-wrapper">
               <h1>Login</h1>
               <div className="login-form">
                  <div className="username form-item">
                     <span>Email</span>
                     <input type="email" className="input-item" />
                  </div>
                  <div className="password form-item">
                     <span>Password</span>
                     <input type="password" className="input-item" />
                  </div>
                  <button className="login-btn">Log In</button>
               </div>
               <div className="divider">
                  <span className="line"></span>
                  <span className="divider-text">Or</span>
                  <span className="line"></span>
               </div>
               <div className="other-login-wrapper">
                  <div className="other-login-item">
                     <a href="/auth/google">
                        <i className="fab fa-google"></i>
                     </a>
                  </div>
                  <div className="other-login-item">
                     <a href="/auth/facebook">
                        <i className="fab fa-facebook"></i>
                     </a>
                  </div>
                  <div className="other-login-item">
                     <a href="/auth/github">
                        <i className="fab fa-github"></i>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
