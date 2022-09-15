import React, { FC, useCallback } from "react";
import { debounce } from "lodash";
import { AsyncSelect } from "chakra-react-select";

import { Api } from "../services/api";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const CityFinderInput: FC<Props> = ({
  placeholder,
  onChange,
  value,
}) => {
  // We could've had react-query or even redux in this place, but it would've been overengineering
  const loadCities = async (val: string) => {
    const api = new Api();

    const cities = await api.searchCities(val);
    const result = cities.items.map((item) => ({ value: item, label: item }));

    return result;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debounce((inputText, callback) => {
      loadCities(inputText).then((options) => callback(options));
    }, 1000),
    []
  );

  return (
    <AsyncSelect
      placeholder={placeholder}
      isClearable={true}
      defaultOptions={true}
      loadOptions={loadOptions}
      value={{ value, label: value }}
      onChange={(opt: any) => onChange(opt?.value)}
    />
  );
};
