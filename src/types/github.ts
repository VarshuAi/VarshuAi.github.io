export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubEventItem {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  createdAt: string;
  actionSummary: string;
}

export interface GitHubRepoItem {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
  tag?: string;
}

export interface GitHubTelemetryData {
  login: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  totalContributionsLastYear: number;
  contributions: GitHubContributionDay[];
  recentEvents: GitHubEventItem[];
  repositories: GitHubRepoItem[];
  isLive: boolean;
  lastFetched: string;
}
