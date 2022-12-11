export const preventScroll = () => {
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };

  window.addEventListener("touchmove", handleTouchMove, {
    passive: false,
    capture: true,
  });

  return () => {
    window.removeEventListener("touchmove", handleTouchMove, { capture: true });
  };
};
