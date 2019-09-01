/** @jsx jsx */
import { jsx } from 'theme-ui';
import styled from '@emotion/styled';

const Type = {
    Patient: 'patient',
    Doctor: 'doctor'
}

const Person = ({ type, parts }) => {
    return (
        <div className={type}>
            {parts.map((part, i) => (<div key={i} className={part}></div>))}
        </div>
    )
}

const Laptop = () => <div className="laptop"></div>;

const Drawing = styled.div`
    display: grid;
    place-items: center;
    margin-top: -70px;
    margin-bottom: 20px;

  .scene {
    display: flex;
    padding: 150px 220px;
  }
  @media only screen and (max-width: 500px) {
    .scene {
      transform: scale(0.5);
      padding: 108px 0px;
    }
  }
  .scene > * {
    position: absolute;
  }
  
  .patient .head, .doctor .head {
    padding: 60px;
    background-color: #9dd8ff;
    border-radius: 50%;
  }
  .patient .head::after, .doctor .head::after {
    content: "";
    position: absolute;
    padding: 20px;
    background-color: #9dd8ff;
    margin: 51px -20px;
  }
  .patient .eyes, .doctor .eyes {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: black;
    border-radius: 50%;
    box-shadow: 50px 0px black;
    animation: blink 3s infinite;
  }
  @keyframes blink {
    0%, 17%, 23%, 100% {
      height: 10px;
    }
    20% {
      height: 5px;
    }
  }
  .patient .body, .doctor .body {
    background-color: #9dd8ff;
    padding: 60px;
    border-radius: 40% 40% 0% 0%;
    margin-top: 10px;
  }
  
  .patient {
    margin: -100px -180px;
  }
  .patient .eyes {
    margin: -70px 41px;
  }
  .patient .arm-left {
    position: absolute;
    height: 112px;
    width: 39px;
    background: #65a9d6;
    margin: -112px 26px;
    transform: skewX(-14deg);
  }
  .patient .arm-left::after {
    content: "";
    padding: 15px 32px;
    background: #65a9d6;
    position: absolute;
    border-radius: 40%;
    margin: 4px -3px;
    transform: rotate(23deg);
  }
  .patient .thumb {
    padding: 7px 6px;
    background: #65a9d6;
    margin: 139px 39px;
    border-radius: 30% 50% 0% 0%;
    transform: rotate(32deg);
  }
  
  .doctor {
    margin: -100px 60px;
  }
  .doctor .eyes {
    margin: -70px 15px;
    animation-delay: 1s;
  }
  .doctor .eyebrows::before, .doctor .eyebrows::after {
    content: "";
    position: absolute;
    padding: 10px;
    background: transparent;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: black;
  }
  .doctor .eyebrows::before {
    margin: -85px 57px;
    animation: up 3s infinite;
  }
  @keyframes up {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(6px);
    }
  }
  .doctor .eyebrows::after {
    margin: -98px 0px;
    transform: rotate(160deg);
  }
  .doctor .arm-right {
    position: absolute;
    height: 130px;
    width: 39px;
    background: #65a9d6;
    margin: -130px 61px;
    transform: skewX(10deg);
  }
  .doctor .arm-right::after, .doctor .arm-right::before {
    content: "";
    position: absolute;
    background: #65a9d6;
  }
  .doctor .arm-right::before {
    padding: 15px 6px;
    margin: -20px 27px;
    border-radius: 50px;
  }
  .doctor .arm-right::after {
    padding: 9px 23px;
    margin: -11px -11px;
    border-radius: 50px;
    animation: pondering 3s infinite;
  }
  @keyframes pondering {
    0%, 60%, 100% {
      margin: -11px -8px;
    }
    40%, 80% {
      margin: -11px -14px;
    }
  }
  .doctor .arm-left {
    position: absolute;
    width: 39px;
    background: #65a9d6;
    border-radius: 0px 40% 0px 0px;
    height: 120px;
    margin: -120px -35px;
    transform: skewX(10deg);
    animation: handmove 3s infinite;
  }
  .doctor .arm-left::after, .doctor .arm-left::before {
    position: absolute;
    content: "";
    background: #65a9d6;
  }
  .doctor .arm-left::after {
    margin: -39px 1px;
    border-radius: 30px 100px 70px 10px;
    transform: rotate(-14deg);
    padding: 21px 13px;
  }
  .doctor .arm-left::before {
    padding: 14px 6px;
    margin: -22px -6px;
    border-radius: 50px 50px 0px 0px;
    transform: rotate(-31deg);
  }
  @keyframes handmove {
    0%, 100% {
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
  .doctor .stethoscope {
    position: absolute;
    width: 120px;
    height: 120px;
    background: transparent;
    border-radius: 50% 50% 50% 50%/10% 10% 90% 90%;
    margin: -212px 0px;
    box-shadow: 0px 6px 0px 3px #3f3f3f;
  }
  .doctor .stethoscope::after {
    content: "";
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
  }
  @keyframes stethomove {
    0%, 100% {
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
  .doctor .scan {
    position: absolute;
    background: radial-gradient(#5278a3 35%, #3f3f3f 35%, #3f3f3f 50%, #5278a3 50%);
    border: 5px solid #3f3f3f;
    padding: 10px;
    border-radius: 50%;
    margin: -151px -75px;
    animation: scanning 3s infinite;
  }
  @keyframes scanning {
    0%, 100% {
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
      box-shadow: 0px 0px 0px 0px, 0px 0px 0px 0px, 0px 0px 2px 10px rgba(255, 190, 147, 0.5);
    }
  }
  
  .laptop {
    padding: 18px 65px;
    background: #909090;
    transform: skew(50deg);
    border-radius: 10px 0px;
    margin: 35px -132px;
    box-shadow: inset 10px -6px #646464;
  }
  .laptop::before {
    content: "";
    position: absolute;
    width: 120px;
    height: 81px;
    background: #909090;
    margin: -69px 5px;
    transform: skewX(-56deg);
    border-radius: 5px 5px 0% 0%;
    box-shadow: inset 6px 6px #646464;
  }
`

export const ReactClinicDrawing = () => (
    <Drawing>
        <div className="scene">
            <Person
                type={Type.Patient}
                parts={['head', 'eyes', 'body', 'arm-left']} />
            <Laptop />
            <Person
                type={Type.Patient}
                parts={['thumb']} />
            <Person
                type={Type.Doctor}
                parts={['head', 'eyes', 'eyebrows', 'body', 'scan', 'arm-left', 'stethoscope', 'arm-right']} />
        </div>
    </Drawing>
);