"use client";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {

  const [countries, setCountries] = useState<CountrySelectValue[]>([]);
  const { getAll } = useCountries()

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getAll();
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  return <div><Select 
    placeholder='Anywhere'
    isClearable
    options={countries}
    value={value}
    onChange={(value) => onChange(value as CountrySelectValue)}
    formatOptionLabel={(option:any) => (
        <div className=" flex flex-row items-center gap-3"> 
        <div>{option.flag}</div>
        <div>  {option.label} 
        <span className="text-neutral-500 ml-1"> 
        {option.region}</span>
        </div>
        </div>
    )}
    classNames={{
        control : () => 'p-2 border-2 cursor-pointer',
        input: () => 'text-lg cursor-pointer',
        option:() => 'text-lg cursor-pointer'
    }}
    theme={ (theme) => (
        {
            ...theme,
            borderRadius:6,
            colors:{
                ...theme.colors,
                primary:'black',
                primary25: '#ffa4a8'

            }
        }
    )}
  />
  </div>;
};

export default CountrySelect;
