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

const useEvents = ({
  onMessage,
}: {
  onMessage: (event: MessageEvent) => void;
}) =>
  useEffect(() => {
    const source = getEventSource();
    if (typeof source === "undefined") {
      return;
    }

    source.addEventListener("message", onMessage);

    return () => {
      source.removeEventListener("message", onMessage);
    };
  }, [onMessage]);

export default useEvents;
