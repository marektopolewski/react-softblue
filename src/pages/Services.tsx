import { loremIpsum } from 'react-lorem-ipsum';
import PageHeader from '../components/PageHeader';
import PageWrapper from '../components/PageWrapper';

import classes from './Services.module.css';

const Services = () => {
  return (
    <PageWrapper>
      <PageHeader title='SERVICES' subtitle='Lorem ipsum' />
      <div className={classes.text}>
        {
          loremIpsum({ p: 10, random: false }).map((text: string, index: number) => (
            <p className={classes.para} key={index}>
              {text}
            </p>
          ))
        }
      </div>
    </PageWrapper>
  );
};

export default Services;
