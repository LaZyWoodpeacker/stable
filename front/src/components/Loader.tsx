import React, { useEffect, useRef } from "react";

interface IProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onIntersect: (entre?: IntersectionObserverEntry) => void;
  status: boolean;
}

const Loader: React.FC<IProps> = ({ scrollRef, onIntersect, status }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const intersectHandler = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === loaderRef.current) {
        onIntersect(entry);
      }
    });
  };

  useEffect(() => {
    if (scrollRef?.current) {
      const observer = new IntersectionObserver(intersectHandler, {
        root: scrollRef.current,
        rootMargin: "0px",
        threshold: 0.5,
      });
      if (loaderRef?.current) observer.observe(loaderRef.current);
    }
  }, [scrollRef]);

  return (
    <div className="loader" ref={loaderRef} onClick={() => onIntersect()}>
      {status ? "Подгружаются" : "Есть ещё"}
    </div>
  );
};

export default Loader;
