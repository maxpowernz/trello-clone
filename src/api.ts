import { AppState } from "AppStateContext";

export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .catch(console.log);
};

export const load = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`);
  return response.json() as Promise<AppState>;
};
