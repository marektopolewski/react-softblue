import { useState } from 'react';
import { Transition } from 'react-transition-group';

export type AnimatedButtonProps = {
  type: 'submit' | 'button',
  text: string,
  timeout?: number,
  className?: string,
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const timeout = props.timeout ?? 200;
  return (
    <Transition in={show} timeout={timeout}>
      { state => {
        if (state === 'exited')
          setShow(false);
        return (
          <button
            type={props.type}
            onClick={() => setShow(true)}
            className={props.className}
            style={{
              opacity: state === 'exited' ? 1 : 0.75,
              transform: `scale(${state === 'exited' ? 1 : 0.85})`,
              transition: `all ${timeout}ms ease-out`
            }}
          >
            {props.text}
          </button>
        );
      }}
    </Transition>
  )
};
