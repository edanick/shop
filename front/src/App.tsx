import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LinearProgress } from '@mui/material';


import useAuth from './hooks/useAuth';
import Layout from "./layout/Layout";


export default function App() {

  const [doneAuth, setDoneAuth] = useState<boolean>(false),
    auth = useAuth();

  useEffect(() => {
    (async () => {

      try {
        await auth();
      } catch (err: any) {
        console.log(err);
      } finally { setDoneAuth(true); }

    })();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      {doneAuth ? <Outlet /> : <LinearProgress />}
    </Layout>
  );
}