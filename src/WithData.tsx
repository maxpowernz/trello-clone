import { load } from "api";
import { AppState } from "AppStateContext";
import React, { useEffect, useState } from "react";
import { ComponentType, PropsWithChildren } from "react";

export const withData = (
  WrappedComponent: ComponentType<PropsWithChildren<{ initialState: AppState }>>
) => {
  return ({ children }: PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: undefined,
      dropped: false,
    });

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState((state) => ({ ...state, lists: [...data.lists] }));
        } catch (err) {
          setError(err);
        }

        setIsLoading(false);
      };

      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <WrappedComponent initialState={initialState}>{children}</WrappedComponent>;
  };
};
