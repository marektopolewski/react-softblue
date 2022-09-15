import { loremIpsum } from 'react-lorem-ipsum';

import PageHeader from '../components/PageHeader';
import PageWrapper from '../components/PageWrapper';
import Loading from '../components/Loading';

import useHttpRequest from '../hooks/UseHttpRequestHook';

import classes from './Home.module.css';

import ServiceFullyResponsive from './imgs/responsive.png'
import ServiceDesigner from './imgs/designer.png'
import Service247Support from './imgs/support.png'
import ExperienceBe from './imgs/be.png'
import ExperienceDribble from './imgs/dribble.png'

const serviceIdToImage = (id: number): string => {
  switch(id) {
    case 1: return ServiceFullyResponsive;
    case 2: return ServiceDesigner;
    case 3: return Service247Support;
  }
  return '';
};

type ServicesItemProps = {
  id: string
  name: string
  description: string
};

const ServicesItem: React.FC<ServicesItemProps> = (props) => (
  <div>
    <img src={serviceIdToImage(parseInt(props.id))} alt={`service ${props.id}`} />
    <p className={classes['service-item-name']}>{props.name.toUpperCase()}</p>
    <p className={classes['service-item-desc']}>{props.description}</p>
  </div>
);


const experienceIdToImage = (id: number): string => {
  switch(id) {
    case 1: case 3: case 4: return ExperienceBe;
    case 2: return ExperienceDribble;
  }
  return '';
};

const toLocaleDateString = (dateString: string) => {
  if (!dateString || dateString === '')
    return "";
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric'
  };
  return (new Date(dateString)).toLocaleDateString('en-US', options);
};

type ExperienceItemProps = {
  id: string
  company: string
  description: string
  from: string
  to: string
};

const ExperienceItem: React.FC<ExperienceItemProps> = (props) => (
  <div className={classes['exp-item']}>
    <div className={classes['exp-header']}>
      <img src={experienceIdToImage(parseInt(props.id))} alt={`experience ${props.id}`} />
      <div>
        <p className={classes['exp-item-name']}>
          {props.company}
        </p>
        <p className={classes['exp-item-dates']}>
          {toLocaleDateString(props.from)} - {toLocaleDateString(props.to)}
        </p>
      </div>
    </div>
    <h3>{props.description.split(' ').splice(0, 2).join(' ')}</h3>
    <p className={classes['exp-item-desc']}>{props.description}</p>
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
            <Loading what='services' data={services}>
              { services?.map(item => <ServicesItem key={item.id}  {...item} />) }
            </Loading>
          </div>
        </PageWrapper>
      </div>

      <div className={classes['my-experience']}>
        <PageWrapper>
          <PageHeader title='QUALIFICATION' subtitle='My Experience' />
          <p>{loremIpsum({ avgWordsPerSentence: 5 })}</p>
          <div className={classes['exp-items-wrapper']}>
            <Loading what='experience items' data={experience}>
              { experience?.map(item => <ExperienceItem key={item.id}  {...item} />) }
            </Loading>
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default Home;
