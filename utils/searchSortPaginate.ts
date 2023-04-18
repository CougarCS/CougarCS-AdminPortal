import { memberType } from "../types/types";

/* 3 step process
    1. use fuzzy search across all elements of each member
    you can probably do this really easily by concatenating
    everything into a string and then using indexOf
    2. sort the elements that made it through
    3. paginate by putting elements in arrays of length N
    
    return an array of those paginated arrays
*/

type SSPConfig = {
  // if query is undef, don't search :)
  query?: string;

  // sort objects by object[property], using dir to determine whether
  // to use < or >
  sort: {
    property: keyof memberType;
    dir: "ascending" | "descending";
  };

  // split elements into arrays of length paginate
  // if paginate is 0, just put all the elements into 1 array
  // and return that array inside another array (so it fits the type def)
  paginate: number;
};

function searchSortPaginate(data: memberType[], cfg: SSPConfig): memberType[][]
{
  const output: memberType[][] = [];
  return output;
}

/*
searchSortPaginate([], {
  paginate: 15,
  query: "Brod",
  sort: {
    dir: "ascending",
    property: "first_name"
  }
});
*/
