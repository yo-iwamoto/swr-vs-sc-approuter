"use client";

import {
  type PropsWithChildren,
  createContext,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
  type ComponentPropsWithoutRef,
  useContext,
  useCallback,
} from "react";
import { NotificationBar } from "smarthr-ui";

type NotificationBarOriginalProps = ComponentPropsWithoutRef<
  typeof NotificationBar
>;

type NotificationBarProps = Pick<
  NotificationBarOriginalProps,
  "type" | "message"
>;

type NotificationContextType = {
  notification: NotificationBarProps | null;
  setNotification: Dispatch<SetStateAction<NotificationBarProps | null>>;
};

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {},
});

export function NotificationBarArea({ children }: PropsWithChildren) {
  const [notification, setNotification] = useState<NotificationBarProps | null>(
    null,
  );

  const provideValue = useMemo(
    () => ({ notification, setNotification }),
    [notification],
  );

  return (
    <NotificationContext.Provider value={provideValue}>
      {notification !== null && (
        <NotificationBar
          {...notification}
          bold
          onClose={() => setNotification(null)}
        />
      )}

      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const { setNotification } = useContext(NotificationContext);

  const notify = useCallback(
    (props: NotificationBarProps) => {
      setNotification(props);
    },
    [setNotification],
  );

  return { notify };
}
