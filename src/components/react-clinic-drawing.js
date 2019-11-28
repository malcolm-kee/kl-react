import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

//#region CSS
const personStyle = css`
  .head {
    padding: 60px;
    background-color: #9dd8ff;
    border-radius: 50%;
    &::after {
      content: '';
      position: absolute;
      padding: 20px;
      background-color: #9dd8ff;
      margin: 51px -20px;
    }
  }
  .eyes {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: black;
    border-radius: 50%;
    box-shadow: 50px 0px black;
    animation: blink 3s infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
  @keyframes blink {
    0%,
    17%,
    23%,
    100% {
      height: 10px;
    }
    20% {
      height: 5px;
    }
  }
  .body {
    background-color: #9dd8ff;
    padding: 60px;
    border-radius: 40% 40% 0% 0%;
    margin-top: 10px;
  }
`;

const doctorStyle = css`
  margin: -100px 60px;
  .eyes {
    margin: -70px 15px;
    animation-delay: 1s;
  }
  .eyebrows {
    &::before,
    &::after {
      content: '';
      position: absolute;
      padding: 10px;
      background: transparent;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: black;
    }
    &::before {
      margin: -85px 57px;
      animation: up 3s infinite;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
    @keyframes up {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(6px);
      }
    }
    &::after {
      margin: -98px 0px;
      transform: rotate(160deg);
    }
  }
  .arm-right {
    position: absolute;
    height: 130px;
    width: 39px;
    background: #65a9d6;
    margin: -130px 61px;
    transform: skewX(10deg);
    &::after,
    &::before {
      content: '';
      position: absolute;
      background: #65a9d6;
    }
    &::before {
      padding: 15px 6px;
      margin: -20px 27px;
      border-radius: 50px;
    }
    &::after {
      padding: 9px 23px;
      margin: -11px -11px;
      border-radius: 50px;
      animation: pondering 3s infinite;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
    @keyframes pondering {
      0%,
      60%,
      100% {
        margin: -11px -8px;
      }
      40%,
      80% {
        margin: -11px -14px;
      }
    }
  }
  .arm-left {
    position: absolute;
    width: 39px;
    background: #65a9d6;
    border-radius: 0px 40% 0px 0px;
    height: 120px;
    margin: -120px -35px;
    transform: skewX(10deg);
    animation: handmove 3s infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      background: #65a9d6;
    }
    &::after {
      margin: -39px 1px;
      border-radius: 30px 100px 70px 10px;
      transform: rotate(-14deg);
      padding: 21px 13px;
    }
    &::before {
      padding: 14px 6px;
      margin: -22px -6px;
      border-radius: 50px 50px 0px 0px;
      transform: rotate(-31deg);
    }
    @keyframes handmove {
      0%,
      100% {
        height: 120px;
        margin: -120px -35px;
      }
      30% {
        height: 105px;
        margin: -105px -51px;
        transform: skewX(24deg);
      }
      58% {
        transform: skewX(10deg);
      }
      60% {
        height: 95px;
        margin: -95px -43px;
      }
    }
  }
  .stethoscope {
    position: absolute;
    width: 120px;
    height: 120px;
    background: transparent;
    border-radius: 50% 50% 50% 50%/10% 10% 90% 90%;
    margin: -212px 0px;
    box-shadow: 0px 6px 0px 3px #3f3f3f;
    &::after {
      content: '';
      position: absolute;
      background: transparent;
      border: 6px solid #3f3f3f;
      border-radius: 0px 0px 100px 100px;
      border-top: none;
      border-left-color: transparent;
      height: 79px;
      width: 118px;
      margin: 65px -74px;
      transform: skewY(-137deg);
      animation: stethomove 3s infinite;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
    @keyframes stethomove {
      0%,
      100% {
        width: 118px;
        margin: 65px -74px;
        transform: skewY(-137deg);
      }
      30% {
        width: 167px;
        margin: 76px -121px;
        transform: skewY(-150deg);
      }
      60% {
        width: 129px;
        margin: 79px -86px;
        transform: skewY(-145deg);
      }
    }
  }
  .scan {
    position: absolute;
    background: radial-gradient(
      #5278a3 35%,
      #3f3f3f 35%,
      #3f3f3f 50%,
      #5278a3 50%
    );
    border: 5px solid #3f3f3f;
    padding: 10px;
    border-radius: 50%;
    margin: -151px -75px;
    animation: scanning 3s infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
  @keyframes scanning {
    0%,
    100% {
      margin: -151px -75px;
    }
    25% {
      box-shadow: 0px 0px 2px 10px rgba(255, 217, 147, 0.5);
    }
    30% {
      margin: -141px -115px;
    }
    45% {
      box-shadow: 0px 0px 0px 0px, 0px 0px 2px 30px rgba(255, 178, 147, 0.5);
    }
    60% {
      margin: -131px -85px;
      box-shadow: 0px 0px 0px 0px, 0px 0px 0px 0px,
        0px 0px 2px 10px rgba(255, 190, 147, 0.5);
    }
  }
`;

const patientStyle = css`
  margin: -100px -180px;
  .eyes {
    margin: -70px 41px;
  }
  .arm-left {
    position: absolute;
    height: 112px;
    width: 39px;
    background: #65a9d6;
    margin: -112px 26px;
    transform: skewX(-14deg);
    &::after {
      content: '';
      padding: 15px 32px;
      background: #65a9d6;
      position: absolute;
      border-radius: 40%;
      margin: 4px -3px;
      transform: rotate(23deg);
    }
  }
  .thumb {
    padding: 7px 6px;
    background: #65a9d6;
    margin: 139px 39px;
    border-radius: 30% 50% 0% 0%;
    transform: rotate(32deg);
  }
`;
//#endregion

//#region Styled Components
const Laptop = styled.div`
  padding: 18px 65px;
  background: #909090;
  transform: skew(50deg);
  border-radius: 10px 0px;
  margin: 35px -132px;
  box-shadow: inset 10px -6px #646464;
  &::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 81px;
    background: #909090;
    margin: -69px 5px;
    transform: skewX(-56deg);
    border-radius: 5px 5px 0% 0%;
    box-shadow: inset 6px 6px #646464;
  }
`;

const Scene = styled.div`
  display: flex;
  padding: 150px 220px;
  @media only screen and (max-width: 500px) {
    transform: scale(0.5);
    padding: 108px 0px;
  }
  & > * {
    position: absolute;
  }
`;

const Drawing = styled.div`
  display: grid;
  place-items: center;
  margin-top: -70px;
  margin-bottom: 20px;
`;
//#endregion

//#region Components
const Person = ({ parts, doctor }) => {
  return (
    <div
      className={doctor ? 'doctor' : 'patient'}
      css={[personStyle, doctor ? doctorStyle : patientStyle]}
    >
      {parts.map((part, i) => (
        <div key={i} className={part}></div>
      ))}
    </div>
  );
};
//#endregion

export const ReactClinicDrawing = () => {
  return (
    <Drawing>
      <Scene>
        <Person parts={['head', 'eyes', 'body', 'arm-left']} />
        <Laptop />
        <Person parts={['thumb']} />
        <Person
          doctor
          parts={[
            'head',
            'eyes',
            'eyebrows',
            'body',
            'scan',
            'arm-left',
            'stethoscope',
            'arm-right',
          ]}
        />
      </Scene>
    </Drawing>
  );
};
