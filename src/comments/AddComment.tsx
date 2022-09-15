import React, { useReducer } from 'react';
import PageWrapper from '../components/PageWrapper';

import classes from './AddComment.module.css';

const MyHr: React.FC<{ width: number }> = (props) => (
  <div className={classes.hr} style={{ width: `${props.width}px` }}></div>
);

class FormReducerState {
  name: string = '';
  email: string = '';
  content: string = '';
  valid: boolean = false;
  touched: boolean = false;
};

type FormReducerAction = {
  type: 'name' | 'email' | 'content' | 'clear',
  payload?: string,
};

const AddComment = () => {

  const [formState, formDispatch] = useReducer(
    (state: FormReducerState, action: FormReducerAction) => {
      if (action.type === 'name')
        return { ...state, name: action.payload ?? '' };
      if (action.type === 'email')
        return { ...state, email: action.payload ?? '' };
      if (action.type === 'content')
        return { ...state, content: action.payload ?? '' };
      if (action.type === 'clear')
        return new FormReducerState();
      return state;
    },
    new FormReducerState()
  );

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = (({ name, email, content }) => ({name, email, content}))(formState);
    alert("sending:\n\n" + JSON.stringify(payload));
    formDispatch({ type: 'clear' });
  };

  return (
    <PageWrapper className={classes.wrapper}>
      <div className={classes.header}>
        <h2>Add comment</h2>
        <div className={classes['hr-wrapper']}>
          <MyHr width={70} />
          <MyHr width={35} />
        </div>
      </div>

      <form className={classes['form-wrapper']} onSubmit={onSubmitHandler}>
          <div className={classes['form-who']}>
            <input
              type='text' name='name'
              placeholder='Your Name'
              value={formState.name}
              onChange={event => formDispatch({ type: 'name', payload: event.target.value})}
            />
            <input
              type='email' name='email'
              placeholder='Your Email'
              value={formState.email}
              onChange={event => formDispatch({ type: 'email', payload: event.target.value})}
            />
          </div>
          <textarea
            name='message'
            rows={4}
            placeholder='Your Messages'
            value={formState.content}
            onChange={event => formDispatch({ type: 'content', payload: event.target.value})}
          />
          <button type='submit'>Send</button>
      </form>

    </PageWrapper>
  );
};

export default AddComment;
