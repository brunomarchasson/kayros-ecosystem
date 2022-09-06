import React, { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

export const PasswordField = React.forwardRef((props, ref) => {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const maskPassword = (isMasked) => {
    setPasswordIsMasked(isMasked);
  };

  return (
    <div className="container">
      <TextField
        ref={ ref }
        autoComplete="current-password"
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onMouseEnter={ () => maskPassword(false) }
                onMouseLeave={ () => maskPassword(true) }
                edge="end"
              >
                { passwordIsMasked ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>
          ),
        } }
        { ...props }
        type={ passwordIsMasked ? 'password' : 'text' }
      />
    </div>
  );
});
