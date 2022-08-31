import React from 'react'
import PropTypes from 'prop-types'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';


const Headings = ({ headings, activeId  }) => {
  const activeStep =headings.findIndex(h => h.id === activeId);

  return (
    <Stepper nonLinear activeStep={activeStep} orientation="vertical" sx = {{
      '& a': {
        color: 'inherit',
    textDecoration: 'none',
      }
    }}>
        {headings.map((heading) => (
          <Step key={heading.id}
          // completed={completed[index]}
          >
            <StepButton color="inherit"
            // onClick={handleStep(index)}
            >
            <a
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: "smooth"
            });
          }}
        >
          {heading.title}
        </a>
            </StepButton>
          </Step>
        ))}
      </Stepper>
  )
}


// (
//   <Stepper nonLinear activeStep={activeStep} orientation="vertical">
//         {headings.map((heading) => (
//           <Step key={label} completed={completed[index]}>
//             <StepButton color="inherit" onClick={handleStep(index)}>
//               {label}
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>

//   <ul>
//     {headings.map((heading) => (
//       <li key={heading.id}>
//         <a
//           href={`#${heading.id}`}
//           onClick={(e) => {
//             e.preventDefault();
//             document.querySelector(`#${heading.id}`).scrollIntoView({
//               behavior: "smooth"
//             });
//           }}
//         >
//           {heading.title}
//         </a>
//         {heading.items.length > 0 && (
//           <ul>
//             {heading.items.map((child) => (
//               <li key={child.id}>
//                 <a
//                   href={`#${child.id}`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     document.querySelector(`#${child.id}`).scrollIntoView({
//                       behavior: "smooth"
//                     });
//                   }}
//                 >
//                   {child.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     ))}
//   </ul>
// );

Headings.propTypes = {}

export default Headings
