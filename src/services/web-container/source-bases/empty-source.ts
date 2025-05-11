import { FileSystemTree } from '@webcontainer/api'

export const BASE: FileSystemTree = {
  'README.md': {
    file: {
      contents: `# How to use
## You can clone source from Github with below command:
\`\`\`bash
git clone /gh/{owner}/{repo} ./{folder}
\`\`\`
`,
    },
  },
}
