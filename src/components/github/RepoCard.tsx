import { GitHubRepoItem } from "@/types/github";
import { ArrowUpRight, Star, GitFork } from "lucide-react";

interface RepoCardProps {
  repo: GitHubRepoItem;
}

function getLanguageColor(lang: string | null): string {
  if (!lang) return "bg-[#68635B]";
  const lower = lang.toLowerCase();
  if (lower.includes("dart") || lower.includes("flutter")) return "bg-[#02569B]";
  if (lower.includes("kotlin")) return "bg-[#7F52FF]";
  if (lower.includes("java")) return "bg-[#B07219]";
  if (lower.includes("python")) return "bg-[#3572A5]";
  if (lower.includes("typescript")) return "bg-[#3178C6]";
  if (lower.includes("javascript")) return "bg-[#F1E05A]";
  if (lower.includes("html")) return "bg-[#E34C26]";
  return "bg-[#C8FF00]";
}

function formatUpdated(dateStr: string): string {
  try {
    const then = new Date(dateStr).getTime();
    const now = Date.now();
    const diffHours = Math.floor((now - then) / (1000 * 60 * 60));
    if (diffHours < 1) return "Pushed just now";
    if (diffHours < 24) return `Pushed ${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Pushed yesterday";
    if (diffDays < 7) return `Pushed ${diffDays}d ago`;
    if (diffDays < 30) return `Pushed ${Math.floor(diffDays / 7)}w ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recent";
  }
}

export function RepoCard({ repo }: RepoCardProps) {
  const isRecent = repo.tag === "RECENTLY PUSHED";

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group p-5 rounded-lg bg-[#0F0F0F] hover:bg-[#141414] border transition-all duration-200 flex flex-col justify-between space-y-4 relative ${
        isRecent
          ? "border-[rgba(200,255,0,0.25)] hover:border-[rgba(200,255,0,0.45)] shadow-[0_4px_20px_rgba(200,255,0,0.03)]"
          : "border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.18)]"
      }`}
    >
      <div className="space-y-2.5">
        {/* Top Header: Tag & External Link */}
        <div className="flex items-center justify-between gap-2">
          {repo.tag ? (
            <span
              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors inline-flex items-center gap-1.5 ${
                isRecent
                  ? "bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00] font-semibold"
                  : repo.tag === "ACTIVE DEV"
                  ? "bg-blue-500/10 border-blue-500/25 text-blue-400 font-medium"
                  : repo.tag === "ORG REPO"
                  ? "bg-purple-500/10 border-purple-500/25 text-purple-300 font-medium"
                  : "bg-[rgba(245,240,232,0.04)] border-[rgba(245,240,232,0.08)] text-[#9E988F]"
              }`}
            >
              {isRecent && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
              )}
              {repo.tag}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-[#68635B]">
              PUBLIC REPO
            </span>
          )}

          <ArrowUpRight className="w-4 h-4 text-[#68635B] group-hover:text-[#C8FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>

        {/* Repo Name */}
        <h4 className="font-mono font-medium text-sm text-[#F5F0E8] group-hover:text-[#C8FF00] transition-colors break-words">
          {repo.fullName}
        </h4>

        {/* Description */}
        <p className="text-xs text-[#9E988F] line-clamp-2 leading-relaxed">
          {repo.description || "Open source system engineered by Varshan Gowda."}
        </p>
      </div>

      {/* Bottom Metadata: Language, Stats, Date */}
      <div className="pt-3 border-t border-[rgba(245,240,232,0.05)] flex items-center justify-between font-mono text-[11px] text-[#68635B]">
        {/* Language */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}
          />
          <span className="text-[#9E988F]">{repo.language || "Multi-stack"}</span>
        </div>

        {/* Metrics & Updated Date */}
        <div className="flex items-center gap-3">
          {repo.stars > 0 && (
            <div className="flex items-center gap-1 text-[#9E988F]">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400/20" />
              <span>{repo.stars}</span>
            </div>
          )}

          {repo.forks > 0 && (
            <div className="flex items-center gap-1 text-[#9E988F]">
              <GitFork className="w-3 h-3" />
              <span>{repo.forks}</span>
            </div>
          )}

          <span className={isRecent ? "text-[#C8FF00]" : ""}>
            {formatUpdated(repo.updatedAt)}
          </span>
        </div>
      </div>
    </a>
  );
}
