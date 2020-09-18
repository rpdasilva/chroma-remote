import { useState, useEffect, Dispatch, SetStateAction } from "react";

const OPTIONS = {};

export const useApi = <T>(
  initialUrl: string,
  initialData: T,
  options: RequestInit = OPTIONS
): [
  { data: T; isLoading: boolean; isError: boolean },
  Dispatch<SetStateAction<string>>
] => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = (await fetch(url, options).then((res) =>
          res.json()
        )) as T;

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, options]);

  return [{ data, isLoading, isError }, setUrl];
};
