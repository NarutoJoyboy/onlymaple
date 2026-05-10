import { useState, useEffect, useRef } from "react";
const CountUp = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: any;
  duration?: any;
  prefix?: any;
  suffix?: any;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: any;
    const animate = (currentTime: any) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
