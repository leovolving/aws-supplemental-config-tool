import { h } from 'preact';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const u = useAuth0();
  const { user, isAuthenticated, isLoading } = u
  console.log({u})

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;