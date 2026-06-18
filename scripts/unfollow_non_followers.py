import requests
import getpass
import sys
import time

def get_my_username(pat):
    """
    Fetches the authenticated user's GitHub username.
    """
    url = "https://api.github.com/user"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json().get("login")
        elif response.status_code == 401:
            print("Error: Unauthorized. Please check if your PAT is valid.")
            sys.exit(1)
        else:
            print(f"Error fetching user profile: Status {response.status_code}")
            sys.exit(1)
    except Exception as e:
        print(f"Network error getting profile: {e}")
        sys.exit(1)

def get_all_followers(pat):
    """
    Fetches all followers of the authenticated user and returns them as a set.
    """
    followers = set()
    page = 1
    per_page = 100
    print("Loading your followers list...")
    
    while True:
        url = f"https://api.github.com/user/followers?page={page}&per_page={per_page}"
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {pat}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if not data:
                    break
                followers.update([u['login'] for u in data])
                print(f"  Loaded {len(followers)} followers so far...")
                if len(data) < per_page:
                    break
                page += 1
            else:
                print(f"Error loading followers: Status {response.status_code}")
                sys.exit(1)
        except Exception as e:
            print(f"Network error loading followers: {e}")
            sys.exit(1)
            
    return followers

def get_all_following(pat):
    """
    Fetches the list of all users followed by the authenticated user.
    GitHub naturally returns this in the order you followed them (oldest first).
    """
    following = []
    page = 1
    per_page = 100
    print("Loading the list of users you follow (oldest first)...")
    
    while True:
        url = f"https://api.github.com/user/following?page={page}&per_page={per_page}"
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {pat}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if not data:
                    break
                following.extend([u['login'] for u in data])
                print(f"  Loaded {len(following)} followings so far...")
                if len(data) < per_page:
                    break
                page += 1
            else:
                print(f"Error loading following: Status {response.status_code}")
                sys.exit(1)
        except Exception as e:
            print(f"Network error loading following: {e}")
            sys.exit(1)
            
    return following

def unfollow_user(username, pat):
    """
    Unfollows a user. Returns True on success.
    """
    url = f"https://api.github.com/user/following/{username}"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {pat}",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Length": "0"
    }
    try:
        response = requests.delete(url, headers=headers)
        if response.status_code == 204:
            return True
        else:
            print(f"Failed (Status {response.status_code})")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    print("=====================================================")
    print("     GitHub Unfollow Non-Followers (Oldest First)     ")
    print("=====================================================")
    
    # 1. Get PAT
    print("Note: Your PAT must have the 'user:follow' or 'user' scope enabled.")
    pat = getpass.getpass("Enter your GitHub Personal Access Token (PAT): ").strip()
    if not pat:
        print("Error: Personal Access Token cannot be empty.")
        sys.exit(1)
        
    my_username = get_my_username(pat)
    print(f"Authenticated as: {my_username}\n")
    
    # 2. Get Followers & Following
    followers = get_all_followers(pat)
    following = get_all_following(pat)
    
    # 3. Ask how many users to unfollow
    limit_input = input("\nMax number of users to unfollow in this run (leave empty to unfollow all): ").strip()
    max_to_unfollow = int(limit_input) if limit_input.isdigit() else None
    
    # 4. Find non-followers (maintaining chronological order)
    non_followers = [u for u in following if u not in followers]
    total_non_followers = len(non_followers)
    
    print(f"\nAnalysis:")
    print(f"  You follow: {len(following)} users")
    print(f"  Followers:  {len(followers)} users")
    print(f"  Non-followers (people you follow who don't follow back): {total_non_followers}")
    
    if total_non_followers == 0:
        print("\nAll the users you follow are already following you back!")
        sys.exit(0)
        
    unfollowed_count = 0
    
    print("\nStarting cleanup process (oldest follows will be processed first)...")
    for idx, user in enumerate(non_followers, 1):
        if max_to_unfollow is not None and unfollowed_count >= max_to_unfollow:
            print(f"\n[Limit Reached] Successfully unfollowed the requested limit of {max_to_unfollow} users.")
            break
            
        print(f"[{idx}/{total_non_followers}] Unfollowing '{user}'... ", end="", flush=True)
        success = unfollow_user(user, pat)
        if success:
            print("Done.")
            unfollowed_count += 1
        else:
            print("Failed.")
            
        time.sleep(0.5)
        
    print(f"\nCleanup complete! Successfully unfollowed {unfollowed_count} non-followers.")

if __name__ == "__main__":
    main()
