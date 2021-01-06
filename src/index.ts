import fs from 'fs'
import * as core from '@actions/core'
import bent from 'bent'
import FormData from 'form-data'


const getJson = bent('json')

const sleep = async (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const main = async () => {
  try {
    const token = core.getInput('token', { required: true })
    const courseId = core.getInput('course-id', { required: true })
    const assignmentId = core.getInput('assignment-id', { required: true })
    const zip = core.getInput('zip', { required: true })
    const domain = core.getInput('domain', { required: false })
    const changelog = core.getInput('changelog', { required: false })

    const authHeaders = {
      'Authorization': 'Bearer ' + token
    }

    const api = bent(`https://octopus.${domain}`, 'POST', 'json', 200)

    const postData = new FormData();
    postData.append('changelog', changelog);
    postData.append('archive', fs.createReadStream(zip),  {
      knownLength: fs.statSync(zip).size
    })
    console.log('API call')
    const headers = Object.assign(postData.getHeaders(), authHeaders)
    headers['Content-Length'] = await postData.getLengthSync()
    const res = await api(`/api/v1/courses/${courseId}/assignments/${assignmentId}/versions`,
      postData, headers);
    const taskUrl = res['taskUri']
    if (!taskUrl) {
      throw new Error('task Url not found')
    }
    console.log(`taskUrl ${taskUrl}`)
    for (let i = 0; i < 100; i++) { // 100 checks attempt
      await sleep(10)
      const status = await getJson(taskUrl, undefined, authHeaders)
      if (status['done']) {
        break
      }
      console.log(status)
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

main()