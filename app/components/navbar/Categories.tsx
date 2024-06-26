"use client";

import React from "react";
import Container from "../container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
  {
    label: "Beach-House",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has  Windmill!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property is has camping activites!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is has camping activites!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is on a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is on a desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is on the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurios!",
  },
];

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div
        className=' 
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        '
      >
        {categories.map((item, index) => (
          <CategoryBox
            key={`${index}-${item.label}`}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
