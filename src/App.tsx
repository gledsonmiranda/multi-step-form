import { FormEvent, useState } from 'react';
import { AccountForm } from './AccountForm';
import { AddressForm } from './AddressForm';
import { useMultiStepForm } from './useMultiStepForm';
import { UserForm } from './UserForm';

type FormDataProps = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormDataProps = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormDataProps>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const steps = [
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ];
  const { currentStepIndex, step, next, prev, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep) return next()
    console.log(data)
    alert("Sucesso")
  }

  return (
    <div
      style={{
        position: 'relative',
        background: 'white',
        border: '1px solid black',
        padding: '2rem',
        margin: '1rem',
        borderRadius: '.5rem',
        fontFamily: 'Arial',
        maxWidth: "max-content"
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '.5rem',
            justifyContent: 'flex-end',
          }}
        >
          {!isFirstStep && (
            <button type='button' onClick={prev}>
              Prev
            </button>
          )}

          <button type='submit'>{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
