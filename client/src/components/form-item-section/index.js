import { h } from 'preact';
import Text from '../text';
import PageSection from '../page-section';
import style from './style.css';

const FormSection = props => {
    const { properties, section } = props;
    const [header, description, formItems] = section;

    return (
      <PageSection className={style.pageSection}>
        <Text element="h3" className={style.header}>{header}</Text>
        <Text color="secondary" className={style.description}>{description}</Text>
        {formItems.map(f => {
          const { name, formInputType, label } = f;
          return (
            <div className={style.formItem}>
              <Text color="secondary" element="label" htmlFor={name}>{label}</Text>
              <input className={style[formInputType]} id={name} name={name} value={properties[name]} type={formInputType} />
            </div>
          )
        })}
      </PageSection>
    );
}

export default FormSection;