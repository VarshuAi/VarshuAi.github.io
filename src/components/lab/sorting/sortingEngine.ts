export type StepType = 'compare' | 'swap' | 'overwrite' | 'sorted';

export interface SortStep {
  type: StepType;
  indices: number[];
  values?: number[];
}

export type AlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

export interface AlgorithmMetadata {
  id: AlgorithmId;
  name: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  summary: string;
}

export const ALGORITHM_METADATA: Record<AlgorithmId, AlgorithmMetadata> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    summary: 'Iteratively compares adjacent pairs and bubbles the largest element to the end.',
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    summary: 'Finds the global minimum in the unsorted suffix and swaps it into position.',
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    summary: 'Builds a sorted prefix by sliding unsorted elements leftward into place.',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(n)',
    summary: 'Recursively halves the list and merges sorted sub-arrays via auxiliary buffers.',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n²)',
    space: 'O(log n)',
    summary: 'Partitions elements around a pivot and recursively sorts adjacent partitions.',
  },
};

export function* bubbleSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
    yield { type: 'sorted', indices: [n - i - 1] };
  }
  yield { type: 'sorted', indices: [0] };
}

export function* selectionSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [minIdx, j] };
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]] };
    }
    yield { type: 'sorted', indices: [i] };
  }
  yield { type: 'sorted', indices: [n - 1] };
}

export function* insertionSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;
  yield { type: 'sorted', indices: [0] };
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        yield { type: 'overwrite', indices: [j + 1], values: [arr[j]] };
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
    yield { type: 'overwrite', indices: [j + 1], values: [key] };
    for (let k = 0; k <= i; k++) {
      yield { type: 'sorted', indices: [k] };
    }
  }
}

export function* mergeSort(
  arr: number[],
  start = 0,
  end = arr.length - 1
): Generator<SortStep, void, unknown> {
  if (start >= end) {
    if (start === end) yield { type: 'sorted', indices: [start] };
    return;
  }
  const mid = Math.floor((start + end) / 2);
  yield* mergeSort(arr, start, mid);
  yield* mergeSort(arr, mid + 1, end);
  yield* merge(arr, start, mid, end);
}

function* merge(
  arr: number[],
  start: number,
  mid: number,
  end: number
): Generator<SortStep, void, unknown> {
  const temp: number[] = [];
  let i = start;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    yield { type: 'compare', indices: [i, j] };
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }
  while (i <= mid) {
    temp.push(arr[i++]);
  }
  while (j <= end) {
    temp.push(arr[j++]);
  }

  for (let k = 0; k < temp.length; k++) {
    const actualIdx = start + k;
    arr[actualIdx] = temp[k];
    yield { type: 'overwrite', indices: [actualIdx], values: [temp[k]] };
    yield { type: 'sorted', indices: [actualIdx] };
  }
}

export function* quickSort(
  arr: number[],
  low = 0,
  high = arr.length - 1
): Generator<SortStep, void, unknown> {
  if (low < high) {
    const pivotIdx = (yield* partition(arr, low, high)) as number;
    yield* quickSort(arr, low, pivotIdx - 1);
    yield* quickSort(arr, pivotIdx + 1, high);
  } else if (low === high) {
    yield { type: 'sorted', indices: [low] };
  }
}

function* partition(
  arr: number[],
  low: number,
  high: number
): Generator<SortStep, number, unknown> {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    yield { type: 'compare', indices: [j, high] };
    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]] };
      }
    }
  }
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  yield { type: 'swap', indices: [i + 1, high], values: [arr[i + 1], arr[high]] };
  yield { type: 'sorted', indices: [i + 1] };
  return i + 1;
}

export function createSortGenerator(
  algorithm: AlgorithmId,
  arr: number[]
): Generator<SortStep, void, unknown> {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(arr);
    case 'selection':
      return selectionSort(arr);
    case 'insertion':
      return insertionSort(arr);
    case 'merge':
      return mergeSort(arr);
    case 'quick':
      return quickSort(arr);
  }
}

export function generateDeterministicArray(size: number): number[] {
  const base = [
    45, 12, 85, 32, 89, 39, 69, 44, 42, 25, 90, 56, 17, 73, 35, 65, 20, 82, 51, 95, 30, 78, 10, 60, 48,
    38, 72, 15, 98, 22, 54, 88, 31, 67, 14, 80, 41, 93, 27, 63, 19, 84, 36, 75, 29, 91, 58, 23, 70, 34,
    86, 49, 16, 96, 28, 62, 18, 83, 37, 76, 24, 68, 40, 87, 33, 79, 11, 61, 47, 92
  ];
  return base.slice(0, size);
}

export function generateRandomArray(size: number, min = 10, max = 100): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}
