import { useSpring, animated } from 'react-spring';

export const AutoComplete = () => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200,
    reset: true,
  });
  return <animated.div style={props}>I will fade in</animated.div>;
};
