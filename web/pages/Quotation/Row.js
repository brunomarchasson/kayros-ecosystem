import { Stack } from '@mui/material';
import React from 'react';

export function Row(p) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={ 1 }
      sx={ {
        '& >*': { flex: 1 },
      } }
      { ...p }
    />
  );
}

export default Row;
