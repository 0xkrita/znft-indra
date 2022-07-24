import { animated, useSpring } from 'react-spring';

const Loading = () => {
  const styles = useSpring({
    loop: true,
    from: { opacity: 1, diameter: 0 },
    to: { opacity: 0, diameter: 100 },
    delay: 400,
  });

  return (
    <div className="flex text-xl">
      Loading...
      <animated.div
        className="w-6 h-6 bg-emerald-600 rounded-full"
        style={styles}
      />
    </div>
  );
};

export default Loading;
