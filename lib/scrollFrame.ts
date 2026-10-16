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

const getViewportHeight = () =>
  Math.max(
    1,
    window.visualViewport?.height ??
      window.innerHeight
  );

const syncViewportHeight = () => {
  document.documentElement.style.setProperty(
    '--viewport-height',
    `${getViewportHeight()}px`
  );
};

const flush = () => {
  frame = 0;

  if (layoutChanged) {
    syncViewportHeight();
  }

  const state: ScrollFrameState = {
    scrollY: window.scrollY,
    viewportHeight: getViewportHeight(),
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

const handleScrollEnd = () => {
  requestScrollFrame(true);
};

const handleResize = () => {
  requestScrollFrame(true);
};

const handleVisualViewportResize = () => {
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
      'scrollend',
      handleScrollEnd,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleResize
    );

    window.visualViewport?.addEventListener(
      'resize',
      handleVisualViewportResize
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
      'scrollend',
      handleScrollEnd
    );

    window.removeEventListener(
      'resize',
      handleResize
    );

    window.visualViewport?.removeEventListener(
      'resize',
      handleVisualViewportResize
    );

    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
};
