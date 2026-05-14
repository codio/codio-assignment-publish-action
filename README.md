# Codio assignment publish action

A GitHub Action that publishes a new version of a Codio assignment (or a book) to a course.

# Inputs

See [action.yml](action.yml) for the full list. All inputs are optional individually, but the
combinations below are required for the action to run.

## Authentication (one of)

| Input | Description |
| --- | --- |
| `token` | API access token |
| `client-id` + `secret-id` | Client ID and Secret ID used to authenticate |

## Course (one of)

| Input | Description |
| --- | --- |
| `course-id` | Course ID |
| `course-name` | Course name (resolved to a course ID) |

## Source (one of)

| Input | Description |
| --- | --- |
| `zip` | Path to the zipped module or `tar.gz` archive |
| `dir` | Directory with the assignment files structure |

## Destination (one of)

| Input | Description |
| --- | --- |
| `assignment-id` | Assignment ID |
| `assignment-name` | Assignment name (resolved via `course-name`) |
| `yml` | Yml configurations folder (used for book publish) |

## Other

| Input | Description | Default |
| --- | --- | --- |
| `changelog` | Changelog message for the published version | |
| `domain` | API domain | `codio.com` |

# Usage

Publish an archive by course and assignment ID:

```yaml
steps:

- uses: codio/codio-assignment-publish-action
  with:
    token: api-token
    course-id: my-course-id
    assignment-id: my-assignment-id
    changelog: message
    zip: new_version.zip
```

Publish an archive by course and assignment name:

```yaml
- uses: codio/codio-assignment-publish-action
  with:
    token: api-token
    course-name: my-course-name
    assignment-name: my-assignment-name
    changelog: message
    zip: new_version.zip
```

Authenticate with a client ID and secret ID instead of a token:

```yaml
- uses: codio/codio-assignment-publish-action
  with:
    client-id: my-client-id
    secret-id: my-secret-id
    course-id: my-course-id
    assignment-id: my-assignment-id
    changelog: message
    zip: new_version.zip
```

Directory publish:

```yaml
steps:

- uses: codio/codio-assignment-publish-action
  with:
    token: api-token
    course-id: my-course-id
    assignment-id: my-assignment-id
    changelog: message
    dir: ./
```

Book publish:

```yaml
steps:

- uses: codio/codio-assignment-publish-action
  with:
    token: api-token
    course-id: my-course-id
    changelog: message
    dir: ./
    yml: ./guides/yaml_map
```

# Development

The action is written in TypeScript and bundled into `dist/index.js` with [`ncc`](https://github.com/vercel/ncc).
It runs on the GitHub Actions `node24` runtime.

```bash
yarn install
yarn release   # bundles src/index.ts into dist/ and stages the result
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
