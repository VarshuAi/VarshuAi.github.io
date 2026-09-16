export type ExperimentCategory =
  | 'ALL'
  | 'DSA'
  | 'AI / ML'
  | 'SYSTEMS'
  | 'MOBILE'
  | 'WEB'
  | 'UI'
  | 'DATA'
  | 'OPEN SOURCE';

export type ExperimentStatus = 'EXPERIMENT' | 'BUILDING' | 'STABLE' | 'ARCHIVED';

export interface AlgorithmComplexity {
  name: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  invariants: string;
  summary: string;
}

export interface ExperimentItem {
  slug: string;
  title: string;
  number: string;
  category: ExperimentCategory;
  status: ExperimentStatus;
  date: string;
  description: string;
  technologies: string[];
  tags: string[];
  featured: boolean;
  interactive: boolean;
  githubUrl?: string;
  demoUrl?: string;
  howItWorks?: string;
  implementation?: string;
  complexityOverview?: {
    timeAverage: string;
    timeWorst: string;
    space: string;
  };
  algorithmDetails?: Record<string, AlgorithmComplexity>;
  whatILearned?: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export const EXPERIMENTS: Record<string, ExperimentItem> = {
  'sorting-lab': {
    slug: 'sorting-lab',
    title: 'SORTING LAB',
    number: '01',
    category: 'DSA',
    status: 'STABLE',
    date: '2025',
    description:
      'Step-synchronized algorithm visualizer exploring memory access patterns, comparison topologies, and swap invariants across classic comparison sorts.',
    technologies: ['TypeScript', 'React 19', 'Generators', 'Asynchronous Dispatcher'],
    tags: ['Algorithms', 'Data Structures', 'Visualization', 'Concurrency'],
    featured: true,
    interactive: true,
    githubUrl: 'https://github.com/varshuai/portfolio2.0',
    demoUrl: '/lab/sorting-lab',
    complexityOverview: {
      timeAverage: 'O(n log n)',
      timeWorst: 'O(n²)',
      space: 'O(log n)',
    },
    howItWorks:
      'Sorting algorithms transform unordered contiguous sequences into monotonically increasing sequences. By decomposing each algorithm into an asynchronous sequence of atomic operations (comparisons, element swaps, and direct memory writes), visitors can observe how divide-and-conquer partitions compare against quadratic incremental passes in real time.',
    implementation:
      'Rather than simulating sorting with arbitrary timeouts or precomputed CSS animations, the visualizer uses ECMAScript generator functions (function*). Each generator yields strongly typed step events { type, indices, values } to an asynchronous execution dispatcher. A cancellable requestAnimationFrame loop advances the generator at the configured delay, ensuring real-time counter accuracy, instant pause/resume capability, and zero main-thread freezing.',
    algorithmDetails: {
      bubble: {
        name: 'Bubble Sort',
        timeAverage: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        invariants: 'After iteration k, the largest k elements are fixed in their final sorted positions at the end of the array.',
        summary: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      },
      selection: {
        name: 'Selection Sort',
        timeAverage: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        invariants: 'The prefix A[0...k-1] contains the k smallest elements from the entire array, fully sorted.',
        summary: 'Finds the minimum element from the unsorted suffix and swaps it with the first unsorted element.',
      },
      insertion: {
        name: 'Insertion Sort',
        timeAverage: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        invariants: 'Sub-array A[0...i] always contains the original elements of A[0...i] in sorted order.',
        summary: 'Consumes elements one by one, shifting larger elements to the right to insert the current item in place. Highly optimal for nearly sorted inputs.',
      },
      merge: {
        name: 'Merge Sort',
        timeAverage: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(n)',
        invariants: 'At depth d of recursion, sub-arrays of size 2^d are sorted before being merged into sub-arrays of size 2^(d+1).',
        summary: 'Divides the array into two halves, recursively sorts them, and merges the sorted halves using auxiliary memory.',
      },
      quick: {
        name: 'Quick Sort',
        timeAverage: 'O(n log n)',
        timeWorst: 'O(n²)',
        space: 'O(log n)',
        invariants: 'After partitioning around pivot p at index j: all elements A[left...j-1] <= p and all elements A[j+1...right] >= p.',
        summary: 'Selects a pivot element, partitions the array around the pivot, and recursively sorts the independent partitions.',
      },
    },
    whatILearned: [
      'Engineered a deterministic step-based generator loop that decouples algorithmic computation from React 19 rendering frames.',
      'Understood memory mutation trade-offs: in-place swapping (Quick/Bubble/Selection) vs auxiliary memory allocation (Merge Sort) and their cache locality impacts.',
      'Built accessible, responsive SVG/flex telemetry that guarantees zero layout shift across mobile viewports.',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'sortingEngine.ts',
      code: [
        'export function* quickSort(',
        '  arr: number[],',
        '  low = 0,',
        '  high = arr.length - 1',
        '): Generator<SortStep, void, unknown> {',
        '  if (low < high) {',
        '    const pivotIdx = yield* partition(arr, low, high);',
        '    yield* quickSort(arr, low, pivotIdx - 1);',
        '    yield* quickSort(arr, pivotIdx + 1, high);',
        '  } else if (low === high) {',
        '    yield { type: \'sorted\', indices: [low] };',
        '  }',
        '}',
      ].join('\n'),
    },
  },
};

export const EXPERIMENTS_LIST = Object.values(EXPERIMENTS);

export const ACTIVE_CATEGORIES: ExperimentCategory[] = [
  'ALL',
  ...Array.from(new Set(EXPERIMENTS_LIST.map((e) => e.category))),
];
