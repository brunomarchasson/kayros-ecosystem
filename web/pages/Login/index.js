import React from 'react';
import { styled } from '@mui/material/styles';
import LoginForm from './LoginForm';
// import './login.css'

const Root = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #24c6dc;
  background: -webkit-linear-gradient(to bottom, #514a9d, #24c6dc);
  background: linear-gradient(to bottom, #514a9d, #24c6dc);

  .box div {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 6px solid rgba(255, 255, 255, 0.8);
  }

  .box div:nth-of-type(1) {
    top: 12%;
    left: 42%;
    animation: animate 10s linear infinite;
  }

  .box div:nth-of-type(2) {
    top: 70%;
    left: 50%;
    animation: animate 7s linear infinite;
  }
  .box div:nth-of-type(3) {
    top: 17%;
    left: 6%;
    animation: animate 9s linear infinite;
  }

  .box div:nth-of-type(4) {
    top: 20%;
    left: 60%;
    animation: animate 10s linear infinite;
  }

  .box div:nth-of-type(5) {
    top: 67%;
    left: 10%;
    animation: animate 6s linear infinite;
  }

  .box div:nth-of-type(6) {
    top: 80%;
    left: 70%;
    animation: animate 12s linear infinite;
  }

  .box div:nth-of-type(7) {
    top: 60%;
    left: 80%;
    animation: animate 15s linear infinite;
  }

  .box div:nth-of-type(8) {
    top: 32%;
    left: 25%;
    animation: animate 16s linear infinite;
  }

  .box div:nth-of-type(9) {
    top: 90%;
    left: 25%;
    animation: animate 9s linear infinite;
  }

  .box div:nth-of-type(10) {
    top: 20%;
    left: 80%;
    animation: animate 5s linear infinite;
  }

  @keyframes animate {
    0% {
      transform: scale(0) translateY(-90px) rotate(360deg);
      opacity: 1;
    }

    100% {
      transform: scale(1.3) translateY(-90px) rotate(-180deg);
      border-radius: 50%;
      opacity: 0;
    }
  }
`;

function Login() {
  return (
    <Root>
      <div className="box">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <LoginForm />
    </Root>
  );
}

Login.propTypes = {};

export default Login;
