# Contribute to the project

Pull requests are welcome.

The project's main branch is `main`. It contains the latest released code.

New feature branches should be created based on `main` branch.

We need to update package.json version inside our feature branch according to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Once a feature branch is merged, GitHub Actions will create a tag based on package.json version.

GitHub will create a draft release based on this tag.

We need to publish this release first. GitHub Actions will publish the new version to npm once the release is published.