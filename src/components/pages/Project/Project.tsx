import './Project.scss'
import { isEmpty } from 'lodash'

import api from '~/api'

import { IProject } from '~/types'

import { useMatches } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Default from '../../layout/default'
import ProjectDetail from '~/components/blocks/ProjectDetail/ProjectDetail'
import ProjectComments from '~/components/blocks/ProjectComments/ProjectComments'

const Project = (props: any) => {
  const [route] = useMatches()
  const [project, setProject] = useState<Partial<IProject>>({})

  const fetchProject = async () => {
    const response: IProject = await api.fetchProject(route.params.id)
    setProject(response)
  }

  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <Default>
      {!isEmpty(project) && <ProjectDetail
        {...project as IProject}
      />}
      <ProjectComments />
    </Default>
  )
}
export default Project
