import { DefaultArtifactClient } from '@actions/artifact';

// Runs in a separate process so file handles leaked by failed download retries
// in @actions/artifact are released before the downloaded archive is extracted.
async function run() {
    const [artifactName, path, resumeRunId] = process.argv.slice(2);
    const artifact = new DefaultArtifactClient();
    // With a run id, take the artifact of that earlier run instead of this one's
    let findBy;
    if (resumeRunId) {
        const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split('/');
        findBy = {
            token: process.env.GITHUB_TOKEN,
            workflowRunId: Number(resumeRunId),
            repositoryOwner,
            repositoryName,
        };
        console.log(`Resuming from ${artifactName} of run ${resumeRunId}`);
    }
    const artifactInfo = await artifact.getArtifact(artifactName, {findBy});
    await artifact.downloadArtifact(artifactInfo.artifact.id, {path, findBy});
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
