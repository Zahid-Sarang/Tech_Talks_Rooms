import React from 'react'

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";

const StepName = ({onNext}) => {
  function nextStep() {
		onNext();
	}
  return (
    <Card title="What’s your full name?" icon="test">
      <TextInputs />
      <p className='mx-auto mt-5 text-secondary-text'>Please use your real name</p>
      <div className="mt-10">
        <Button onClick={nextStep} text="Next"/>
      </div>
    </Card>
  )
}

export default StepName