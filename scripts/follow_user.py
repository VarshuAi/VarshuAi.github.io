import requests
import getpass
import sys
import time
from datetime import datetime, timezone

def get_last_active_days(username, pat):
    """
    Checks the user's public events to see how many days ago they were last active.
    Falls back to user profile updated_at if no public events are available.
    """
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    
    # 1. Try public events (most accurate for actual code/push/issue activity)
    events_url = f"https://api.github.com/users/{username}/events/public?per_page=1"
    try:
        response = requests.get(events_url, headers=headers)
        if response.status_code == 200:
            events = response.json()
            if events and len(events) > 0:
                created_at = events[0].get("created_at")
                if created_at:
                    dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                    delta = datetime.now(timezone.utc) - dt
                    return delta.days
        
        # 2. Fallback to user profile updated_at metadata
        profile_url = f"https://api.github.com/users/{username}"
        response_profile = requests.get(profile_url, headers=headers)
        if response_profile.status_code == 200:
            profile = response_profile.json()
            updated_at = profile.get("updated_at")
            if updated_at:
                dt = datetime.fromisoformat(updated_at.replace("Z", "+00:00"))
                delta = datetime.now(timezone.utc) - dt
                return delta.days
    except Exception as e:
        print(f"\n[Warning] Could not check activity for {username}: {e}")
        
    return None

def follow_user(username, pat):
    """
    Follows a single user. Returns True on success, False otherwise.
    """
    url = f"https://api.github.com/user/following/{username}"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Length": "0"
    }
    
    try:
        response = requests.put(url, headers=headers)
        if response.status_code == 204:
            return True
        elif response.status_code == 401:
            print("\nError: Unauthorized. Check if your PAT is valid and has 'user:follow' scope.")
            sys.exit(1)
        else:
            print(f"Failed (Status {response.status_code})")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")
        return False

def sync_following(target_user, pat, max_to_follow, max_days_inactive):
    """
    Retrieves followed users page-by-page and processes them (checks activity & follows)
    immediately without downloading the entire list first.
    """
    page = 1
    per_page = 100
    followed_count = 0
    total_found_processed = 0
    
    print(f"\nStarting sync from '{target_user}'...")
    
    while True:
        url = f"https://api.github.com/users/{target_user}/following?page={page}&per_page={per_page}"
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {pat}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        
        try:
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                if response.status_code == 404:
                    print(f"Error: Target user '{target_user}' not found.")
                elif response.status_code == 403:
                    print("Error: Status 403 (Forbidden). Rate limit exceeded or bad token permissions.")
                else:
                    print(f"Error fetching page {page}: Status {response.status_code}")
                break
                
            users = response.json()
            if not users:
                # No more users followed by the target
                break
                
            print(f"\n--- Processing page {page} ({len(users)} users found) ---")
            
            for user_info in users:
                user = user_info['login']
                total_found_processed += 1
                
                # Check limit
                if max_to_follow is not None and followed_count >= max_to_follow:
                    print(f"\n[Limit Reached] Successfully followed the maximum requested limit of {max_to_follow} users.")
                    return followed_count
                
                print(f"[{total_found_processed}] Checking '{user}'... ", end="", flush=True)
                
                # Check activity threshold if specified
                if max_days_inactive is not None:
                    days_ago = get_last_active_days(user, pat)
                    if days_ago is None:
                        print("Skipped (Unable to verify activity).")
                        continue
                    elif days_ago > max_days_inactive:
                        print(f"Skipped (Last active {days_ago} days ago).")
                        continue
                    else:
                        print(f"Active {days_ago} days ago. ", end="")
                
                # Follow user
                print("Following... ", end="", flush=True)
                success = follow_user(user, pat)
                if success:
                    print("Done.")
                    followed_count += 1
                else:
                    print("Failed.")
                
                # Sleep to prevent hitting GitHub abuse rate limits
                time.sleep(0.5)
                
            # If the current page had fewer than per_page users, we reached the end of the list
            if len(users) < per_page:
                break
                
            page += 1
            
        except requests.exceptions.RequestException as e:
            print(f"Network error during sync: {e}")
            break
            
    return followed_count

def main():
    print("=====================================================")
    print("      GitHub Follower Synchronization Script         ")
    print("=====================================================")
    
    # 1. Get Target User
    target_user = input("Enter target GitHub username (whose following list you want to copy): ").strip()
    if not target_user:
        print("Error: Target username cannot be empty.")
        sys.exit(1)
        
    # 2. Get PAT
    print("\nNote: Your PAT must have the 'user:follow' or 'user' scope enabled.")
    pat = getpass.getpass("Enter your GitHub Personal Access Token (PAT): ").strip()
    if not pat:
        print("Error: Personal Access Token cannot be empty.")
        sys.exit(1)
        
    # 3. Ask how many users to follow (Limit)
    limit_input = input("\nMax number of users to follow (leave empty for unlimited): ").strip()
    max_to_follow = int(limit_input) if limit_input.isdigit() else None
    
    # 4. Ask for activity threshold (no of days back online)
    days_input = input("Only follow users active in the last N days (leave empty to skip check): ").strip()
    max_days_inactive = int(days_input) if days_input.isdigit() else None
    
    # Start synchronous check and follow loop
    followed_count = sync_following(target_user, pat, max_to_follow, max_days_inactive)
    
    print(f"\nSynchronization completed! Successfully followed {followed_count} users.")

if __name__ == "__main__":
    main()
