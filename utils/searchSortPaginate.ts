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


export function searchSortPaginate(data: memberType[], cfg: SSPConfig): memberType[][] {

  // Search
  let newArr: memberType[] = [];
  let search: string = "";

  if (cfg.query != undefined) {
    data.forEach((val) => {
      search = "";
      search = (JSON.stringify(val)).toLowerCase();
      let q: any = cfg.query?.toLocaleLowerCase();
      if (search.indexOf(q) != -1)
        newArr.push(val);
    });
  }
  else {
    newArr = [...data];
  }

  // Sort
  newArr?.sort(comparison(cfg.sort.property, cfg.sort.dir));

  // Paginate

  const output: memberType[][] = [];
  while (newArr.length > 0) {
    output.push(newArr.splice(0, cfg.paginate));
  }
  return output;
};

function comparison(
  property: string | number,
  direction: "ascending" | "descending"
) {
  const compareFn = (a: any, b: any) => {
    const val1 = a[property];
    const val2 = b[property];
    const order = (direction == "ascending") ? 1 : -1;

    switch (typeof val1) {
      case "number": {
        const valb = val2 as number;
        const result = val1 - valb;
        return result * order;
      }
      case "string": {
        const valb = val2 as string;
        const result = val1.localeCompare(valb);
        return result * order;
      }

      default:
        return 0;
    }
  };
  return compareFn;
};



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

