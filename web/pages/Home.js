import { Button } from '@mui/material';
import React, { useState } from 'react';
import ActionFeedback from '../components/ActionFeedback';
import Loader from '../components/Loader';



function F(p) {
  return (
    <div>
      { JSON.stringify(p) }
    </div>
  );
}
function Home() {
  const [promise, setPromise] = useState();

  const p = () => new Promise((resolve, reject) => {
    console.log('start p');
    setTimeout(() => {
      console.log('resolve ^pp');
      resolve('hello');
    }, 3000);
  });
  const p2 = () => new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('bad')), 3000);
  });

  return (
    <div>
      <Button onClick={ () => setPromise(() => p) }>resolve</Button>
      <Button onClick={ () => setPromise(() => p2) }>reject</Button>
      <ActionFeedback promise={ promise }>
        <F />
      </ActionFeedback>
      Home
      { /* <Loader /> */ }
    </div>
  );
}

Home.propTypes = {};

export default Home;
