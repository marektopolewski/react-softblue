import React, { useReducer } from 'react';

import PageWrapper from '../PageWrapper';

import { useHttpRequest } from '../../hooks/UseHttpRequestHook';

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

const AddComment: React.FC<{ onAdded: () => void }> = (props) => {

  const [formState, formDispatch] = useReducer(
    (state: FormReducerState, action: FormReducerAction) => {
      const { type, payload } = action;
      if (type === 'name')
        return { ...state, name: payload ?? '' };
      if (type === 'email')
        return { ...state, email: payload ?? '' };
      if (type === 'content')
        return { ...state, content: payload ?? '' };
      if (type === 'clear')
        return new FormReducerState();
      return state;
    },
    new FormReducerState()
  );

  const [, sendComment] = useHttpRequest<any>('comments', true);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, content } = formState;
    if (name === '' || email === '' || content === '')
      return;
    formDispatch({ type: 'clear' });
    sendComment({
      method: 'POST',
      body: JSON.stringify({ name, email, content }),
      headers: { 'Content-Type': 'application/json' }
    });
    props.onAdded();
    alert('Thank you for your comment!');
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

      <form aria-label='form' className={classes['form-wrapper']} onSubmit={onSubmitHandler}>
          <div className={classes['form-who']}>
            <input
              type='text' name='name' aria-label='name'
              placeholder='Your Name'
              required maxLength={40} pattern='[\w\s]*'
              value={formState.name}
              onChange={event => formDispatch({ type: 'name', payload: event.target.value})}
            />
            <input
              type='email' name='email' aria-label='email'
              placeholder='Your Email'
              required
              value={formState.email}
              onChange={event => formDispatch({ type: 'email', payload: event.target.value})}
            />
          </div>
          <textarea
            name='message' aria-label='message'
            rows={4}
            placeholder='Your Messages'
            required maxLength={400}
            value={formState.content}
            onChange={event => formDispatch({ type: 'content', payload: event.target.value})}
          />
          <button type='submit'>Send</button>
      </form>

    </PageWrapper>
  );
};

export default AddComment;
