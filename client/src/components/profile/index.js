import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import Form from '../form';
import Layout from '../layout';

const Profile = () => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const [config, setConfig] = useState({});

  useEffect(async() => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      // TODO: replace with env variable once available
      fetch('http://localhost:5050/config', {headers: {authorization: `Bearer ${token}`}})
      .then(res => res.json())
      .then(setConfig)
    }
  }, [isAuthenticated]);

  return (
    isAuthenticated && config && !!Object.keys(config).length && (
      <Fragment>
        <Layout 
          projectName={config.projectName}
          userName={config.auth0Users.find(a => a.id === user.sub).name}
          pageTitle="Configuration Settings"
          pageDescription={`Here is where you will be able to change any settings you need to make ${config.projectName} run just the way you like it. Any changes will take affect immediately, unless otherwise specified by our Bukoba Beach rep.`}
        >
          <Form data={config.writeData} properties={config.properties} />
        </Layout>
      </Fragment>
    )
  );
};

export default Profile;