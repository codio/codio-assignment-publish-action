# Codio assessment publish action

Publishes assessment

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

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)