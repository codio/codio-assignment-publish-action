import fs from 'fs'
import * as core from '@actions/core'
import codio from 'codio-api-js'


const main = async () => {
  try {
    const token = core.getInput('token', { required: false })
    const clientId = core.getInput('client-id', { required: false })
    const secretId = core.getInput('secret-id', { required: false })

    let courseId = core.getInput('course-id', { required: false })
    const courseName = core.getInput('course-name', { required: false })
    let assignmentId = core.getInput('assignment-id', { required: false })
    const assignmentName = core.getInput('assignment-name', { required: false })

    const yml = core.getInput('yml', { required: false })
    const zip = core.getInput('zip', { required: false })
    const dir = core.getInput('dir', { required: false })
    const domain = core.getInput('domain', { required: false })
    const changelog = core.getInput('changelog', { required: false })
    if (!token && !clientId && !secretId) {
      throw new Error('no Auth Data')
    }

    if (!courseId && !courseName) {
      throw new Error('no course defined')
    }
    if (!zip && !dir) {
      throw new Error('no source is defined')
    }
    if (!yml && !assignmentId && !assignmentName) {
      throw new Error('no destination defined')
    }
    codio.v1.setDomain(domain)

    if (!token) {
      console.log('Authentication')
      await codio.v1.auth(clientId, secretId)
    } else {
      codio.v1.setAuthToken(token)
    }

    let foundAssignment

    if (courseName && !courseId) {
      const courseInfo = await codio.v1.course.findByName(courseName, true)
      courseId = courseInfo.id
      if (assignmentName && !assignmentId) {
        for (const assignment of courseInfo.assignments) {
          if (assignment.name === assignmentName) {
            if (!foundAssignment) {
              foundAssignment = assignment
            } else {
              throw new Error(`many assignments with same name ${assignmentName}`)
            }
          }
        }
      }
    }
    if (foundAssignment) {
      assignmentId = foundAssignment.id
    }
    

    if (zip) {
      if (!assignmentId) {
        throw new Error(`assignment not found with name "${assignmentName}"`)
      }
      await codio.v1.assignment.publishArchive(courseId, assignmentId, zip, changelog)
    } else {
      if (yml) {
        await codio.v1.assignment.reducePublish(courseId, dir, yml, changelog)
      } else {
        if (!assignmentId) {
          throw new Error(`assignment not found with name "${assignmentName}"`)
        }
        await codio.v1.assignment.publish(courseId, assignmentId, dir, changelog)
      }
    }

    console.log('publish Completed')

  } catch (error: any) {
    if (error.json) {
      console.log(await error.json())
    }
    core.setFailed(error.message)
  }
}

main()