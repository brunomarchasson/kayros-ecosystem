import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';


function Headings({ headings, activeId }) {
  const activeStep = headings.findIndex((h) => h.id === activeId);

  return (
    <Stepper
      nonLinear
      activeStep={ activeStep }
      orientation="vertical"
      sx={ {
        '& a': {
          color: 'inherit',
          textDecoration: 'none',
        },
      } }
    >
      { headings.map((heading) => (
        <Step key={ heading.id }>
          <a
            href={ `#${heading.id}` }
            onClick={ (e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: 'smooth',
              });
            } }
          >
            <StepButton color="inherit">
              { heading.title }
            </StepButton>
          </a>
        </Step>
      )) }
    </Stepper>
  );
}


Headings.propTypes = {
  headings: PropTypes.array,
  activeId: PropTypes.string,
};

export default Headings;
