import { useEffect } from "react";

import { apiURL, apiVer } from "src/util/api";

let eventSource: EventSource;

export const eventSourceURL = `${apiURL}/api/${apiVer}/events`;

export const getEventSource = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  if (typeof eventSource === "undefined") {
    eventSource = new EventSource(eventSourceURL, { withCredentials: true });
  }
  return eventSource;
};

interface Listener {
  onMessage: (event: MessageEvent) => void;
}

const useEvents = ({
  onMessage,
  ...listeners
}: Partial<Listener> & Record<string, Listener>) =>
  useEffect(() => {
    const source = getEventSource();
    if (typeof source === "undefined") {
      return;
    }

    if (onMessage) {
      source.addEventListener("message", onMessage);
    }
    Object.entries(listeners).forEach(([name, listener]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source.addEventListener(name as any, listener.onMessage);
    });

    return () => {
      if (onMessage) {
        source.removeEventListener("message", onMessage);
      }
      Object.entries(listeners).forEach(([name, listener]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source.removeEventListener(name as any, listener.onMessage);
      });
    };
  }, [onMessage, listeners]);

export default useEvents;
