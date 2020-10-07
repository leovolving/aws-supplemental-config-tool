import { h } from 'preact';
import Text from '../text';
import PageSection from '../page-section';

const FormSection = props => {
    const { properties, section } = props;
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

  export default FormSection;