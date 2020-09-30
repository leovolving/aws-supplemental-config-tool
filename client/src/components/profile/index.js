import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../layout';

const Profile = () => {
    const u = useAuth0();
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = u
  console.log({u})

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const [config, setConfig] = useState({});

  useEffect(async() => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently()
      console.log({token})
      // TODO: replace with env variable once available
      fetch('http://localhost:5050/config', {credentials: 'same-origin', headers: {authorization: `Bearer ${token}`}})
      .then(res => res.json())
      .then(setConfig)
    }
  }, [isAuthenticated])

  console.log({config})

  return (
    isAuthenticated && (
      <div>
        <Layout />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;