import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Assets (Use i1, i2, i3)
import i1 from "./i1.jpeg";
import i2 from "./i2.jpeg";
import i3 from "./i3.jpeg";

import "./Login.css"; // Same CSS file

const Signup = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmShown, setIsConfirmShown] = useState(false);

  const togglePassword = () => setIsPasswordShown(!isPasswordShown);
  const toggleConfirm = () => setIsConfirmShown(!isConfirmShown);

  return (
    <div className="login container grid">
      <div className="login__container grid">
        {/* --- Left Side: Slider --- */}
        <div className="login__swiper">
          <div className="login__swiper-data">
            <p className="login__swiper-subtitle">Join Us</p>
            <h1 className="login__swiper-title">
              Create Your Account <br /> Start Managing Tournaments
            </h1>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="login__swiper-wrapper"
          >
            <SwiperSlide>
              <img src={i1} alt="Slide 1" className="login__swiper-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i2} alt="Slide 2" className="login__swiper-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i3} alt="Slide 3" className="login__swiper-img" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* --- Right Side: Form --- */}
        <div className="login__area grid">
          <div className="login__data">
            <h1 className="login__title">Create Account 🚀</h1>
            <p className="login__description">Please fill your details.</p>

            <button className="login__button-border">
              <i className="ri-apple-fill"></i> Sign up with Apple
            </button>
          </div>

          <span className="login__line">or</span>

          <form className="login__form">
            <div className="login__content grid">
              {/* Full Name */}
              <div className="login__box">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="login__input"
                  required
                />
                <i className="ri-user-line"></i>
              </div>

              {/* Email */}
              <div className="login__box">
                <input
                  type="email"
                  placeholder="Email"
                  className="login__input"
                  required
                />
                <i className="ri-mail-line"></i>
              </div>

              {/* Password */}
              <div className="login__box">
                <input
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="Password"
                  className="login__input"
                  required
                />
                <i
                  className={
                    isPasswordShown
                      ? "ri-eye-off-line login__eye"
                      : "ri-eye-line login__eye"
                  }
                  onClick={togglePassword}
                ></i>
              </div>

              {/* Confirm Password */}
              <div className="login__box">
                <input
                  type={isConfirmShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="login__input"
                  required
                />
                <i
                  className={
                    isConfirmShown
                      ? "ri-eye-off-line login__eye"
                      : "ri-eye-line login__eye"
                  }
                  onClick={toggleConfirm}
                ></i>
              </div>
            </div>

            <button type="submit" className="login__button">
              Sign Up
            </button>
          </form>

          <p className="login__switch">
            Already have an account?
            <Link to="/login" className="login__sign">
              {" "}
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
