export default function uniqueMergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  return merge(
    uniqueMergeSort(array.slice(0, mid)),
    uniqueMergeSort(array.slice(mid))
  );
}

function merge(array1, array2) {
  const sorted = [];
  let i = 0,
    j = 0;
  let lastElement = null;
  while (i < array1.length && j < array2.length) {
    let val1 = array1[i],
      val2 = array2[j];
    if (val1 === lastElement) {
      i++;
      continue;
    }
    if (val2 === lastElement) {
      j++;
      continue;
    }
    if (val1 < val2) {
      sorted.push(val1);
      lastElement = val1;
      i++;
    } else {
      sorted.push(val2);
      lastElement = val2;
      j++;
    }
  }

  while (i < array1.length) {
    let val = array1[i];
    if (lastElement === val) {
      i++;
      continue;
    }
    sorted.push(val);
    i++;
  }

  while (j < array2.length) {
    let val = array2[j];
    if (lastElement === val) {
      j++;
      continue;
    }
    sorted.push(val);
    j++;
  }

  return sorted;
}
