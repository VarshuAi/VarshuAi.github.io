import { GitHubEventItem } from "@/types/github";
import { GitCommit, GitPullRequest, GitBranch, Star, Terminal } from "lucide-react";

interface ActivityFeedProps {
  events: GitHubEventItem[];
}

function formatRelativeTime(dateString: string): string {
  try {
    const then = new Date(dateString).getTime();
    const now = Date.now();
    const diffSec = Math.max(0, Math.floor((now - then) / 1000));

    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "recent";
  }
}

function getEventIcon(type: string) {
  switch (type) {
    case "PushEvent":
      return <GitCommit className="w-3.5 h-3.5 text-[#C8FF00]" />;
    case "CreateEvent":
      return <GitBranch className="w-3.5 h-3.5 text-[#9E988F]" />;
    case "PullRequestEvent":
      return <GitPullRequest className="w-3.5 h-3.5 text-[#C8FF00]" />;
    case "WatchEvent":
      return <Star className="w-3.5 h-3.5 text-yellow-400" />;
    default:
      return <Terminal className="w-3.5 h-3.5 text-[#68635B]" />;
  }
}

function getEventBadge(type: string) {
  switch (type) {
    case "PushEvent":
      return { label: "PUSH", color: "bg-[#C8FF00]/10 text-[#C8FF00] border-[#C8FF00]/20" };
    case "CreateEvent":
      return { label: "BRANCH", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    case "PullRequestEvent":
      return { label: "PR", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
    case "WatchEvent":
      return { label: "STAR", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
    default:
      return { label: "EVENT", color: "bg-white/5 text-[#9E988F] border-white/10" };
  }
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] flex flex-col h-full">
      {/* Terminal Window Chrome */}
      <div className="px-4 py-3 border-b border-[rgba(245,240,232,0.08)] bg-[#121212] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5F0E8]/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF00]/40 inline-block" />
          </div>
          <span className="text-[#68635B] ml-2">audit_log //</span>
          <span className="text-[#F5F0E8] text-[11px]">telemetry.stream</span>
        </div>
        <div className="hidden sm:block text-[10px] text-[#68635B] uppercase tracking-wider">
          LIVE GIT LOG
        </div>
      </div>

      {/* Terminal Event Stream */}
      <div className="p-4 sm:p-5 space-y-3.5 flex-1 font-mono text-xs">
        <div className="text-[#68635B] text-[11px] pb-1 border-b border-[rgba(245,240,232,0.04)]">
          $ git log --public-events --target=@varshuai
        </div>

        {events && events.length > 0 ? (
          events.map((evt) => {
            const badge = getEventBadge(evt.type);
            return (
              <div
                key={evt.id}
                className="group p-3 rounded-md bg-[#141414] hover:bg-[#181818] border border-[rgba(245,240,232,0.04)] hover:border-[rgba(245,240,232,0.1)] transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getEventIcon(evt.type)}
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                    <a
                      href={evt.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5F0E8] font-medium hover:text-[#C8FF00] transition-colors truncate max-w-[190px] sm:max-w-[260px]"
                    >
                      {evt.repo}
                    </a>
                  </div>
                  <span className="text-[10px] text-[#68635B] shrink-0">
                    {formatRelativeTime(evt.createdAt)}
                  </span>
                </div>

                <div className="text-[11px] text-[#9E988F] pl-5">
                  › {evt.actionSummary}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-[#68635B] text-xs py-4 text-center">
            No recent public events recorded in the current cache window.
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2.5 border-t border-[rgba(245,240,232,0.06)] bg-[#0C0C0C] font-mono text-[10px] text-[#68635B] flex items-center justify-between">
        <span>STATUS: SYNCHRONIZED</span>
        <span>STREAM: SECURE HTTPS</span>
      </div>
    </div>
  );
}
