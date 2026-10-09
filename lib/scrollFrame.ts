export type ScrollFrameState = {
  scrollY: number;
  viewportHeight: number;
  layoutChanged: boolean;
};

type ScrollFrameSubscriber = (
  state: ScrollFrameState
) => void;

const subscribers =
  new Set<ScrollFrameSubscriber>();

let frame = 0;
let layoutChanged = true;

const syncViewportHeight = () => {
  document.documentElement.style.setProperty(
    '--viewport-height',
    `${window.innerHeight}px`
  );
};

const flush = () => {
  frame = 0;

  if (layoutChanged) {
    syncViewportHeight();
  }

  const state: ScrollFrameState = {
    scrollY: window.scrollY,
    viewportHeight: window.innerHeight,
    layoutChanged,
  };

  layoutChanged = false;

  subscribers.forEach((subscriber) => {
    subscriber(state);
  });
};

export const requestScrollFrame = (
  invalidateLayout = false
) => {
  layoutChanged ||= invalidateLayout;

  if (frame) return;

  frame = window.requestAnimationFrame(flush);
};

const handleScroll = () => {
  requestScrollFrame();
};

const handleResize = () => {
  requestScrollFrame(true);
};

export const subscribeScrollFrame = (
  subscriber: ScrollFrameSubscriber
) => {
  if (subscribers.size === 0) {
    syncViewportHeight();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleResize
    );
  }

  subscribers.add(subscriber);
  requestScrollFrame(true);

  return () => {
    subscribers.delete(subscriber);

    if (subscribers.size > 0) return;

    window.removeEventListener(
      'scroll',
      handleScroll
    );

    window.removeEventListener(
      'resize',
      handleResize
    );

    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
};
