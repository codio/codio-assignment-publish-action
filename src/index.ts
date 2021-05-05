import fs from 'fs'
import * as core from '@actions/core'
import codio from 'codio-api-js'


const main = async () => {
  try {
    const token = core.getInput('token', { required: false })
    const clientId = core.getInput('client-id', { required: false })
    const secretId = core.getInput('secret-id', { required: false })

    const courseId = core.getInput('course-id', { required: true })
    const assignmentId = core.getInput('assignment-id', { required: false })
    const yml = core.getInput('yml', { required: false })
    const zip = core.getInput('zip', { required: false })
    const dir = core.getInput('dir', { required: false })
    const domain = core.getInput('domain', { required: false })
    const changelog = core.getInput('changelog', { required: false })
    if (!token && !clientId && !secretId) {
      throw new Error('no Auth Data')
    }

    if (!zip && !dir) {
      throw new Error('no source is defined')
    }
    if (!yml && !assignmentId) {
      throw new Error('no destination defined')
    }
    codio.v1.setDomain(domain)

    if (!token) {
      console.log('Authentication')
      await codio.v1.auth(clientId, secretId)
    } else {
      codio.v1.setAuthToken(token)
    }

    if (zip) {
      await codio.v1.assignment.publishArchive(courseId, assignmentId, zip, changelog)
    } else {
      if (yml) {
        await codio.v1.assignment.reducePublish(courseId, dir, yml, changelog)
      } else {
        await codio.v1.assignment.publish(courseId, assignmentId, dir, changelog)
      }
    }

    console.log('publish Completed')

  } catch (error) {
    if (error.json) {
      console.log(await error.json())
    }
    core.setFailed(error.message)
  }
}

main()