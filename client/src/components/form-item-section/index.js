import { h, Fragment } from 'preact';
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
          const { name, formInputType, label } = f;
          return (
            <Fragment>
              <Text element="label" htmlFor={name}>{label}</Text>
              <input id={name} name={name} value={properties[name]} type={formInputType} />
            </Fragment>
          )
        })}
      </PageSection>
    );
}

export default FormSection;