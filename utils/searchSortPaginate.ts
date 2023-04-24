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

function createCompareFn<T extends Object>(
  property: keyof T,
  sort_order: "ascending" | "descending"
) {
  const compareFn = (a: T, b: T) => {
    const val1 = a[property];
    const val2 = b[property];
    const order = (sort_order !== "descending") ? 1 : -1;

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
}

export function searchSortPaginate(data: memberType[], cfg: SSPConfig): memberType[][] {


  let newArr: memberType[] = [];
  let search: string = "";

  if (cfg.query != undefined) {
    data.forEach((val) => {
      search = "";
      search = JSON.stringify(val);
      let q: any = cfg.query;
      if (search.indexOf(q) != -1)
        newArr.push(val);

    });
  }
  else {
    newArr = data;
  }

  newArr.sort(createCompareFn(cfg.sort.property, cfg.sort.dir));

  // const order = (cfg.sort.dir == "ascending") ? 1 : -1;

  // switch (cfg.sort.property) {
  //   case "uh_id":
  //     newArr.sort((a, b) => (a.uh_id > b.uh_id) ? order : -1 * order);
  //     break;
  //   case "first_name":
  //     newArr.sort((a, b) => (a.first_name > b.first_name) ? order : -1 * order);
  //     break;
  //   case "last_name":
  //     newArr.sort((a, b) => (a.last_name > b.last_name) ? order : -1 * order);
  //     break;
  //   case "email":
  //     newArr.sort((a, b) => (a.email > b.email) ? order : -1 * order);
  //     break;
  //   case "phone_number":
  //     newArr.sort((a, b) => (a.phone_number > b.phone_number) ? order : -1 * order);
  //     break;
  //   case "shirt_size_id":
  //     newArr.sort((a, b) => (a.shirt_size_id > b.shirt_size_id) ? order : -1 * order);
  //     break;
  //   case "timestamp":
  //     newArr.sort((a, b) => (a.timestamp > b.timestamp) ? order : -1 * order);
  //     break;

  // }

  const paginate = newArr.slice(0, cfg.paginate);


  const output: memberType[][] = [];

  output.push(paginate);

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

