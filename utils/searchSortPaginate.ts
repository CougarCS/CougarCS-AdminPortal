import { SSPConfig, memberType } from "../types/types";

/* 3 step process
    1. use fuzzy search across all elements of each member
    you can probably do this really easily by concatenating
    the values into a string and then using indexOf
    2. sort the elements that made it through
    3. paginate by putting elements in arrays of length N (array.splice)
    
    return an array of those paginated arrays
*/

// this is just returning data for now since the func isn't written
export function searchSortPaginate(data: memberType[], cfg: SSPConfig): memberType[][]
{
  const output: memberType[][] = [];
  output.push(data);

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
