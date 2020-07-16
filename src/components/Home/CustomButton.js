import React from 'react';

const CustomButton = ({desiredEndpoint, currentEndpoint, caseText, buttonFunction}) => {
  if (desiredEndpoint === currentEndpoint) return null;
  return (
    <button className="my-button" onClick={e => buttonFunction()}>
      View {caseText}
    </button>
  )
}

export default CustomButton;
