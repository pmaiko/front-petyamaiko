import '../../assets/styles/pages/Project.scss'
import { isEmpty } from 'lodash'

import api from '~/api'

import { IProject, IProjectsComments } from '~/types'

import { useMatches } from 'react-router-dom'
import { lazy, useEffect, useMemo, useState } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

import Spinner from '~/components/shared/Spinner'

const ProjectDetail = lazy(() => import('~/components/blocks/ProjectDetail'))
const ProjectComments = lazy(() => import('~/components/blocks/ProjectComments'))

const Project = (props: any) => {
  const [route] = useMatches()
  const [project, setProject] = useState<Partial<IProject>>({})
  const [comments, setComments] = useState<Partial<IProjectsComments[]>>([])

  const isLoading = useMemo(() => {
    return (isEmpty(project))
  }, [project])

  const {
    setLoadedPage,
    dispatchAppProgressEvent,
    SuspenseLoader
  } = useAppLoaded()

  const onLoaded = () => {
    setLoadedPage(true)
  }
  const updateComments = (newComment: IProjectsComments) => {
    setComments((prev) => [...prev, newComment])
  }

  useEffect(() => {
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

    Promise.all(
      [
        fetchProject(),
        fetchProjectsComments()
      ]
    ).finally(() => {
      dispatchAppProgressEvent()
    })
  }, [route.params.id])

  return (
    <>
      {!isLoading &&
        <>
          <SuspenseLoader onLoaded={onLoaded}>
            <ProjectDetail
              {...project as IProject}
            />

            <ProjectComments
              comments={comments as IProjectsComments[]}
              project_id={project?.id || 0}
              updateComments={updateComments}
            />
          </SuspenseLoader>
        </>
      }
      {
        isLoading &&
        <>
          <Spinner />
        </>
      }
    </>
  )
}
export default Project
