/** @jsx jsx */
import { jsx } from 'theme-ui';
import './react-clinic-drawing.css';

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

export const ReactClinicDrawing = () =>
    (
        <div className="container">
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
        </div >
    );