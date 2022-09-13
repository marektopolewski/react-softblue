import { loremIpsum } from 'react-lorem-ipsum';

import PageHeader from '../components/PageHeader';
import PageWrapper from '../components/PageWrapper';
import useHttpRequest from '../hooks/UseHttpRequestHook';

import classes from './Home.module.css';

type ServicesItemProps = {
  id: number
  name: string
  description: string
};
const ServicesItem: React.FC<ServicesItemProps> = (props) => (
  <div>
    <p>{props.id}</p>
    <p className={classes['service-item-name']}>{props.name.toUpperCase()}</p>
    <p className={classes['service-item-desc']}>{props.description}</p>
  </div>
);

type ExperienceItemProps = {
  id: string
  company: string
  description: string
  from: string
  to: string
};
const ExperienceItem: React.FC<ExperienceItemProps> = (props) => (
  <div className={classes['exp-item']}>
    <p>{props.id}</p>
    <p className={classes['exp-item-name']}>{props.company.toUpperCase()}</p>
    <p className={classes['exp-item-desc']}>{props.description}</p>
    <p className={classes['exp-item-desc']}>{props.from}</p>
    <p className={classes['exp-item-desc']}>{props.to}</p>
  </div>
);

const Home = () => {
  const [services,] = useHttpRequest<ServicesItemProps>('services');
  const [experience,] = useHttpRequest<ExperienceItemProps>('experience');
  return (
    <>
      <div className={classes['what-we-do']}>
        <PageWrapper>
          <PageHeader title='WHAT WE DO' subtitle='Better Services For You' />
          <p>{loremIpsum({ avgWordsPerSentence: 4 })}</p>
          <div className={classes['services-items-wrapper']}>
            {
              services.map(item => <ServicesItem key={item.id} {...item} />)
            }
          </div>
        </PageWrapper>
      </div>

      <div className={classes['my-experience']}>
        <PageWrapper>
          <PageHeader title='QUALIFICATION' subtitle='My Experience' />
          <p>{loremIpsum({ avgWordsPerSentence: 5 })}</p>
          <div className={classes['exp-items-wrapper']}>
            {
              experience.map(item => <ExperienceItem key={item.id}  {...item} />)
            }
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default Home;
