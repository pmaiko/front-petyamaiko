import './Project.scss'
import { isEmpty } from 'lodash'

import api from '~/api'

import { IProject, IProjectsComments } from '~/types'

import { useMatches } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Default from '../../layout/default'
import ProjectDetail from '~/components/blocks/ProjectDetail/ProjectDetail'
import ProjectComments from '~/components/blocks/ProjectComments/ProjectComments'

const Project = (props: any) => {
  const [route] = useMatches()
  const [project, setProject] = useState<Partial<IProject>>({})
  const [comments, setComments] = useState<Partial<IProjectsComments[]>>([])

  const fetchProject = async () => {
    const response: IProject = await api.fetchProject(route.params.id)
    setProject(response)
  }

  const fetchProjectsComments = async () => {
    if (route.params?.id) {
      const response: IProjectsComments[] = await api.fetchProjectsComments({
        project_id: parseFloat(route.params.id)
      })
      setComments(response)
    }
  }

  useEffect(() => {
    fetchProject()
    fetchProjectsComments()
  }, [])

  const updateComments = (newComment: IProjectsComments) => {
    setComments((prev) => [...prev, newComment])
  }

  return (
    <Default>
      {!isEmpty(project) && (project?.id || project?.id === 0) &&
        <>
          <ProjectDetail
            {...project as IProject}
          />

          <ProjectComments
            comments={comments as IProjectsComments[]}
            project_id={project.id}
            updateComments={updateComments}
          />
        </>
      }
    </Default>
  )
}
export default Project
