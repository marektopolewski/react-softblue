import { loremIpsum } from 'react-lorem-ipsum';
import PageHeader from '../components/PageHeader';
import PageWrapper from '../components/PageWrapper';

import classes from './Experience.module.css';

const Experience = () => {
  return (
    <PageWrapper>
      <PageHeader title='EXPERIENCE' subtitle='Lorem ipsum' />
      <div className={classes.text}>
        {
          loremIpsum({ p: 8, random: false }).map((text: string, index: number) => (
            <p className={classes.para} key={index}>
              {text}
            </p>
          ))
        }
      </div>
    </PageWrapper>
  );
};

export default Experience;
