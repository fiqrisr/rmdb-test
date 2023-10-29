import { Select, SelectItem } from "@nextui-org/react";
import { SortBy } from "@/types";

const sortData: { value: SortBy; label: string }[] = [
  {
    value: "popularity.asc",
    label: "Less Popular"
  },
  {
    value: "popularity.desc",
    label: "Most Popular"
  }
];

type MovieSortSelectProps = {
  selectedSort: SortBy;
  setSelectedSort: (value: SortBy) => void;
};

export const MovieSortSelect = ({
  selectedSort,
  setSelectedSort
}: MovieSortSelectProps) => {
  return (
    <Select
      label="Sort By"
      className="max-w-[170px]"
      selectedKeys={[selectedSort]}
      onChange={(e) => {
        setSelectedSort(e.target.value as SortBy);
      }}
    >
      {sortData.map((sort) => (
        <SelectItem key={sort.value} value={sort.value}>
          {sort.label}
        </SelectItem>
      ))}
    </Select>
  );
};
