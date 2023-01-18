# Codio assignment publish action

Publishes assignment

# Usage

See [action.yml](action.yml)


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

```yaml
- uses: codio/codio-assignment-publish-action
  with:
    token: api-token
    course-name: my-course-name
    assignment-name: my-assignment-name
    changelog: message
    zip: new_version.zip
```

Directory publish
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

book publish
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

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
