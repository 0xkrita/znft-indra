import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Footer = () => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: 'translate(100%,0)' },
    to: { transform: 'translate(-100%,0)' },
    config: { duration: 20000 },
    // reverse: key % 2 === 0,
    reset: true,
    onRest: () => setKey(key + 1),
  });

  return <animated.div style={scrolling}>{`WELCOME TO INDRA`}</animated.div>;
};

export default Footer;
