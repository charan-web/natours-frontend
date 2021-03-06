// import React, {useRef} from "react";
// import { useGlobal } from './useGlobal';
import Error from "./Error";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { showAlert } from "./alerts";
// import redux from "redux";
import { connect } from "react-redux";
import { callTheUser } from "./reduser/userAction";
import { Link } from "react-router-dom";
const Me = ({ user, callUser }) => {
  const [Obj, setObj] = useState({ name: "", email: "", photo: "" });
  useEffect(() => {
    callUser();
  }, [callUser]);
  
  let form = new FormData()
  let userPhoto = useRef('')
 
 

  //  let name = user?.data?.data?.user.name

  //  let email = user?.data?.data?.user.email
  //  let photo = user?.data?.data?.user.photo

 

  
  const [pass, setPass] = useState({ 
    currentpassword: "",
    password: "",
    passwordConfirm: "",
  });  
  const handleChange = (e, type) => {
    let name = e.target.name;
    let value = e.target.value;
    if (type === "password") { 
      setPass({ ...pass, [name]: value });
    } else {
      if(name==="photo") value= userPhoto.current.files[0]
      setObj({ ...Obj, [name]: value });
     

    }
  };           
   
    
  const send = async (e, data, type) => {
    const form = new FormData()
    form.append('photo',Obj.photo) 
    form.append('email',Obj.email)
    form.append('name',Obj.name) 
    console.log(Array.from(form))

    for(let obj of form){
      console.log(obj)
    }

    // form.photo = Obj.photo
    // form.email = Obj.email
    // form.name = Obj.name
   
    e.preventDefault();
    let url =
      type === "password"
        ? "https://infinite-spire-90765.herokuapp.com/user/updatepassword"
        : "https://infinite-spire-90765.herokuapp.com/user/updateme";
         
    try {
      const res = await axios({
        method:'patch' ,    
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
        data:type==='password'? {currentpassword:pass.currentpassword,password:pass.password,passwordConfirm:pass.passwordConfirm} : 
        form
        // {name:form.name,email:form.email,photo:form.photo}
      });
      
      if (res.status === "success") {
        window.location = "/me";
        showAlert("success", "updated successfully");
        
      }
    } catch (err) {
      
      return <Error value="Please try agian later" />;
    }
  };

  if (user.isLoggedIn) {
    return (
      <>
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              <ul className="side-nav">
                <li className="side-nav--active">
                  <a href="/img/icons.svg#icon-settings">
                    <svg href="/img/icons.svg#icon-settings"></svg>| Settings
                  </a>
                </li>
                <li className="side-nav--active">
                  <Link to="/my-tours">
                    svg use(xlink:href='img/icons.svg#icon-briefcase') | My
                    Bookings
                  </Link>
                </li>
                <li className="side-nav--active">
                  <a href="/">
                    svg use(xlink:href='img/icons.svg#icon-star') | My Reviews
                  </a>
                </li>
                <li className="side-nav--active">
                  <a href="/">
                    svg use(xlink:href='/img/icons.svg#icon-credit-card') |
                    Billing
                  </a>
                </li>
              </ul>
              {/* Admin page */}
              {`${user?.data?.data?.user?.role}` === "admin" ? (
                <div className="admin-nav">
                  <h5 className="admin-nav__heading">Admin</h5>
                  <ul className="side-nav">
                    <li>
                      <a href="/">
                        svg use(xlink:href='img/icons.svg#icon-map') | Manage
                        tours
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        svg use(xlink:href='img/icons.svg#icon-users') | Manage
                        Users
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        svg use(xlink:href='img/icons.svg#icon-star') | Manage
                        Reviews
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        svg use(xlink:href='img/icons.svg#icon-briefcase') |
                        Manage Tours
                      </a>
                    </li>
                  </ul>
                </div> 
              ) : null}
            </nav>
            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your Accoount Settings {`Mr.${user?.data?.data?.user?.name.split(' ')}`}
                </h2>
                <form className="form form-user-data">
                  <div className="form__group">
                    <label htmlFor="name" className="form__label">
                      Name
                    </label>
                    <input
                      value={Obj.name}
                      onChange={(e) => handleChange(e)}
                      className="form__input"
                      required
                      type="text"
                      id="name"
                      name="name"
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label htmlFor="email" className="form__label">
                      Email
                    </label>
                    <input
                      className="form__input"
                      value={Obj.email}
                      onChange={(e) => handleChange(e)}
                      name="email"
                      id="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img
                      className="form__user-photo"src={`/img/users/user-1.jpg`}
                      // src={`/img/users/${user?.data?.data?.user?.photo}`}
                      alt="user"
                    />
                    <input
                      onChange={(e) => handleChange(e)}
                      type="file"
                      name="photo"
                      id="photo"
                      accept="image/*"
                      className="form__upload"
                      ref={userPhoto}
                    />
                    <label onChange={(e) => handleChange(e)} htmlFor="photo">
                      Choose Photo
                    </label>
                  </div>
                  <div className="form__group right">
                    <button
                      className="btn btn--small btn--green"
                      onClick={(e) =>
                        send(
                          e,
                         form,
                          "user"
                        )
                      }
                    >
                      Save settings
                    </button>
                  </div>
                </form>
                <div className="line"></div>
                <div className="user-view__form-container">
                  <h2 className="heading-secondary ma-bt-md">
                    password Change
                  </h2>
                  <form action="/" className="form form-user-settings">
                    <div className="form__group">
                      <label htmlFor="password" className="form__label">
                        Current Password
                      </label>
                      <input
                        onChange={(e) => handleChange(e, "password")}
                        className="form__input"
                        id="password-current"
                        type="password"
                        required
                        minLength="8"
                        name="currentpassword"
                      />
                    </div>
                    <div className="form__group">
                      <label
                        htmlFor="password"
                        id="password"
                        className="form__label"
                      >
                        New Password
                      </label>
                      <input
                        onChange={(e) => handleChange(e, "password")}
                        className="form__input"
                        id="password"
                        type="password"
                        required
                        minLength="8"
                        name="password"
                      />
                    </div>
                    <div className="form__group ma-bt-lg">
                      <label htmlFor="password-confirm" className="form__label">
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) => handleChange(e, "password")}
                        type="password"
                        id="password-confirm"
                        className="form__input"
                        minLength="8"
                        required
                        name="passwordConfirm"
                      />
                    </div>
                    <div className="form__group right">
                      <button
                        className="btn btn--small btn--green"
                        onClick={(e) =>
                          send(
                            e,
                            {
                              password: pass.password,
                              currentpassword: pass.currentpassword,
                              passwordConfirm: pass.passwordConfirm,
                            },
                            "password"
                          )
                        }
                      >
                        Save Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return "Loading...";
  }
};

const mapStateToProps = (state) => {
  
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callUser: () => dispatch(callTheUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Me);
