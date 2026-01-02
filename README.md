# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## How to Connect to a GitHub Repository

If you want to push your project to a new GitHub repository, follow these steps.

**Step 1: Create a New Repository on GitHub**

1.  Go to [GitHub](https://github.com) and log in.
2.  Click the **+** icon in the top-right corner and select **New repository**.
3.  Give your repository a name (e.g., "doc-connect-app").
4.  **Important**: Do NOT initialize the new repository with a `README`, `.gitignore`, or `license` file. Your project already contains these.
5.  Click **Create repository**.

**Step 2: Connect Your Project to the New Repository**

On the next page, GitHub will show you a repository URL. It will look like this: `https://github.com/Your-Username/Your-Repo-Name.git`.

Copy this URL. Then, run the following commands in your terminal, one by one.

1.  **Remove the old, incorrect remote URL (if it exists):**
    ```bash
    git remote remove origin
    ```
    *(It's okay if this command shows an error saying 'origin' doesn't exist. It just means you're starting clean.)*

2.  **Add your new repository's URL:**
    Replace `Your-Repo-URL` with the URL you copied from GitHub.
    ```bash
    git remote add origin Your-Repo-URL
    ```

3.  **Verify the new URL:**
    ```bash
    git remote -v
    ```
    This should show your new repository URL.

4.  **Push Your Code:**
    ```bash
    git push -u origin main
    ```

This will upload your project to your new GitHub repository.

---
## How to Fix Common Git Errors

### Error: `fatal: repository '...' not found`

This error means the GitHub repository URL configured in your local environment is incorrect or you don't have access. Follow the steps in the "How to Connect to a GitHub Repository" section above to fix it.

### Error: `fatal: Need to specify how to reconcile divergent branches`

This error happens when both your local project and the remote GitHub repository have changes that the other doesn't. You need to tell Git how to combine them.

Run the following command to set your pull strategy to "merge" (this is a safe default):
```bash
git config pull.rebase false
```
After running this command, try your `git pull` again.
