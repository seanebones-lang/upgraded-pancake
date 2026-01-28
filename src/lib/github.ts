import { Octokit } from '@octokit/rest'

let octokit: Octokit | null = null

export function getOctokit(token?: string) {
  if (!octokit) {
    octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN,
    })
  }
  return octokit
}

export async function getUserRepos(token?: string) {
  const kit = getOctokit(token)
  const { data } = await kit.rest.repos.listForAuthenticatedUser({
    per_page: 50,
    sort: 'updated',
  })
  return data
}

export async function getRepoTree(owner: string, repo: string, branch = 'main', token?: string) {
  const kit = getOctokit(token)
  const { data } = await kit.rest.git.getTree({
    owner,
    repo,
    tree_sha: branch,
    recursive: '1',
  })
  return data.tree
}

export async function getFileContent(owner: string, repo: string, path: string, branch = 'main', token?: string) {
  const kit = getOctokit(token)
  const { data } = await kit.rest.repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  })
  return data
}

export async function createOrUpdateFile(
  owner: string, 
  repo: string, 
  path: string, 
  content: string, 
  message: string, 
  branch = 'main',
  sha?: string,
  token?: string
) {
  const kit = getOctokit(token)
  await kit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: btoa(content),
    branch,
    sha,
  })
}