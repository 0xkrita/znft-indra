import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const AutoComplete = () => {
  const [flip, set] = useState(false);

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });
  return <animated.div style={props}>I will fade in</animated.div>;
};

export default AutoComplete;
