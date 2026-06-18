"""
VarshuOS — All Repos Theme Injector
====================================
Run this ONCE to inject a daily-rotating theme banner into all your repos.
After this, themes update automatically forever because the banner links
to the SVGs in your profile repo which already rotate daily.

Usage:
    python update_all_repos.py

Requirements:
    pip install requests
"""

import requests
import getpass
import sys
import time
import base64

# ─── CONFIG ────────────────────────────────────────────────────────────────────
GITHUB_USERNAME = "VarshuAi"

# The theme banner injected into every repo.
# It points to the SVGs in the profile repo that already rotate daily.
THEME_BANNER = """\
<!-- VARSHUOS-THEME-START -->
<div align="center">
<img src="https://raw.githubusercontent.com/VarshuAi/VarshuAi/main/assets/boot.svg" width="100%"/>
</div>

<!-- VARSHUOS-THEME-END -->
"""

THEME_START = "<!-- VARSHUOS-THEME-START -->"
THEME_END   = "<!-- VARSHUOS-THEME-END -->"
# ───────────────────────────────────────────────────────────────────────────────


def get_all_repos(pat):
    """Fetch all repos (public + private) for the authenticated user."""
    repos = []
    page = 1
    print("Fetching all your repositories...")

    while True:
        url = f"https://api.github.com/user/repos?per_page=100&page={page}&type=owner"
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {pat}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Error fetching repos: {response.status_code}")
            sys.exit(1)

        data = response.json()
        if not data:
            break

        repos.extend(data)
        print(f"  Fetched {len(repos)} repos so far...")

        if len(data) < 100:
            break
        page += 1

    return repos


def get_readme(owner, repo, pat):
    """
    Get the README.md content and SHA for a repo.
    Returns (content_str, sha) or (None, None) if no README.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/README.md"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        content = base64.b64decode(data['content']).decode('utf-8', errors='replace')
        sha = data['sha']
        return content, sha
    elif response.status_code == 404:
        return None, None  # No README
    else:
        return None, None


def inject_theme_banner(content):
    """
    Injects or replaces the theme banner block in the README content.
    - If already has VARSHUOS-THEME-START block, replaces it.
    - Otherwise, prepends it at the very top.
    """
    if THEME_START in content and THEME_END in content:
        # Replace existing block
        start_idx = content.index(THEME_START)
        end_idx = content.index(THEME_END) + len(THEME_END)
        new_content = content[:start_idx] + THEME_BANNER + content[end_idx:].lstrip('\n')
    else:
        # Prepend at the top
        new_content = THEME_BANNER + "\n" + content

    return new_content


def update_readme(owner, repo, new_content, sha, pat):
    """
    Updates the README.md in a repo via GitHub API.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/README.md"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28"
    }

    encoded_content = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')

    payload = {
        "message": "theme: VarshuOS daily rotating banner injected",
        "content": encoded_content,
        "sha": sha
    }

    response = requests.put(url, headers=headers, json=payload)
    return response.status_code in (200, 201)


def create_readme(owner, repo, pat):
    """
    Creates a brand new README.md in a repo that has none.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/README.md"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28"
    }

    default_content = THEME_BANNER + f"\n# {repo}\n\n> Built by VarshuAi\n"
    encoded_content = base64.b64encode(default_content.encode('utf-8')).decode('utf-8')

    payload = {
        "message": "theme: VarshuOS daily rotating banner added",
        "content": encoded_content
    }

    response = requests.put(url, headers=headers, json=payload)
    return response.status_code in (200, 201)


def main():
    print("==========================================================")
    print("   VarshuOS — Inject Theme Banner Into All Repos          ")
    print("==========================================================")
    print(f"This will inject a daily-rotating theme banner into all repos")
    print(f"of '{GITHUB_USERNAME}'. After this runs ONCE, all repos will")
    print(f"auto-update daily because the banner references the SVGs in")
    print(f"your profile repo which already rotate every day.\n")

    # 1. PAT
    print("Note: Your PAT needs 'repo' scope to update repo files.")
    pat = getpass.getpass("Enter your GitHub Personal Access Token (PAT): ").strip()
    if not pat:
        print("Error: PAT cannot be empty.")
        sys.exit(1)

    # 2. Get all repos
    repos = get_all_repos(pat)
    total = len(repos)
    print(f"\nFound {total} repositories.\n")

    # 3. Ask which to skip (e.g. the profile repo itself)
    skip_input = input(
        f"Repos to SKIP (comma separated, e.g. '{GITHUB_USERNAME},some-repo'), "
        "or leave empty to process all: "
    ).strip()
    skip_repos = set(r.strip() for r in skip_input.split(",") if r.strip())
    # Always skip the special profile repo to avoid breaking it
    skip_repos.add(GITHUB_USERNAME)

    # 4. Limit
    limit_input = input(f"Max repos to update in this run (leave empty for all {total}): ").strip()
    max_repos = int(limit_input) if limit_input.isdigit() else None

    # 5. Process
    updated = 0
    created = 0
    skipped = 0
    failed = 0
    processed = 0

    print("\nStarting injection...\n")

    for idx, repo_data in enumerate(repos, 1):
        repo_name = repo_data['name']
        is_fork = repo_data.get('fork', False)
        is_archived = repo_data.get('archived', False)

        # Skip conditions
        if repo_name in skip_repos:
            print(f"[{idx}/{total}] Skipping '{repo_name}' (in skip list).")
            skipped += 1
            continue
        if is_fork:
            print(f"[{idx}/{total}] Skipping '{repo_name}' (fork).")
            skipped += 1
            continue
        if is_archived:
            print(f"[{idx}/{total}] Skipping '{repo_name}' (archived).")
            skipped += 1
            continue

        if max_repos is not None and processed >= max_repos:
            print(f"\n[Limit Reached] Processed {max_repos} repos.")
            break

        print(f"[{idx}/{total}] Processing '{repo_name}'... ", end="", flush=True)

        content, sha = get_readme(GITHUB_USERNAME, repo_name, pat)

        if content is not None:
            # README exists — inject/update the banner
            new_content = inject_theme_banner(content)
            if new_content == content:
                print("Already up to date.")
                skipped += 1
            else:
                success = update_readme(GITHUB_USERNAME, repo_name, new_content, sha, pat)
                if success:
                    print("Updated!")
                    updated += 1
                else:
                    print("Failed.")
                    failed += 1
        else:
            # No README — create one with the banner
            success = create_readme(GITHUB_USERNAME, repo_name, pat)
            if success:
                print("Created new README with banner!")
                created += 1
            else:
                print("Failed.")
                failed += 1

        processed += 1
        # Delay to avoid hitting secondary rate limits
        time.sleep(1)

    print(f"""
==========================================================
  Done!
  Updated  : {updated} repos
  Created  : {created} repos (new README)
  Skipped  : {skipped} repos
  Failed   : {failed} repos
==========================================================
From now on ALL repos show today's theme automatically.
No need to run this again unless you add new repos.
==========================================================
""")


if __name__ == "__main__":
    main()
