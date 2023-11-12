import { SORT_ORDER } from "./consts";

export const sortObjectsCallback = (sortOrder) => {
  if (sortOrder === SORT_ORDER.DESC) {
    return (a, b) => {
      let fa = a.title.toLowerCase(),
        fb = b.title.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    };
  } else if (sortOrder === SORT_ORDER.ASC) {
    return (a, b) => {
      let fa = a.title.toLowerCase(),
        fb = b.title.toLowerCase();

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    };
  }
};
