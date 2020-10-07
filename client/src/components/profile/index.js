import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import FormFooter from '../form-footer';
import Layout from '../layout';
import PageSection from '../page-section';
import Text from '../text';

// TODO: move to separate file, with both "properties" and "section" as props
const createFormSection = properties => section => {
  const [header, description, formItems] = section;
  return (
    <PageSection>
      <Text element="h3">{header}</Text>
      <Text color="secondary">{description}</Text>
      {formItems.map(f => {
        const { name } = f;
        return <Text>{properties[name]}</Text> // TODO: replace with actual form inputs
      })}
    </PageSection>
  );
}

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
      fetch('http://localhost:5050/config', {credentials: 'same-origin', headers: {authorization: `Bearer ${token}`}})
      .then(res => res.json())
      .then(setConfig)
    }
  }, [isAuthenticated]);

  const createForms = createFormSection(config.properties);

  return (
    isAuthenticated && config && Object.keys(config).length && (
      <div>
        <Layout 
          projectName={config.projectName}
          userName={config.auth0Users.find(a => a.id === user.sub).name}
          pageTitle="Configuration Settings"
          pageDescription={`Here is where you will be able to change any settings you need to make ${config.projectName} run just the way you like it. Any changes will take affect immediately, unless otherwise specified by our Bukoba Beach rep.`}
          subFooter={`These configuration settings are for the sole use of ${config.customerName}.`}
        >
          <form>
            {config.writeData.map(createForms)}
            <PageSection>
              <img src={user.picture} alt={user.name} />
              <Text element="h2">{user.name}</Text>
              <Text>{user.email}</Text>
            </PageSection>
            <FormFooter />
          </form>
        </Layout>
      </div>
    )
  );
};

export default Profile;