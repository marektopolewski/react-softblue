import { useEffect, useState } from "react";

const LOADING_TEXT = "...";

type LoadingProps = {
  what: string,
  data: any[] | undefined,
  children: React.ReactNode,
}

const LoadingDots = () => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    let it = 0;
    const interval = setInterval(() => {
      setText(LOADING_TEXT.slice(0, it++ % (LOADING_TEXT.length + 1)));
    }, 200);
    return () => clearInterval(interval);
  }, [setText]);

  return (
    <div style={{ width: '90px' }}>
      <p style={{ width: '100%' }}>Loading{text}</p>
    </div>
  )
};


const Loading: React.FC<LoadingProps> = (props) => {

  if (!props.data)
    return <p>Could not load {props.what}</p>
  
  if (props.data.length === 0)
    return <LoadingDots />
  
  return <>{props.children}</>

};

export default Loading;
