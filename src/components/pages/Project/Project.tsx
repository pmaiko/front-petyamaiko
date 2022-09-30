import './Project.scss'

import api from '~/api'

import { IProject } from '~/types'

import { useMatches } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Default from '../../layout/default'
import BaseImage from '~/components/base/BaseImage'

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
      <section className='project'>
        <div className='container'>
          <div className='project__image'>
            <BaseImage image={{ src: project.image || '' }} />
          </div>

          <h1 className='project__label'>
            {project.label}
          </h1>
          <p className='project__description'>
            {project.description}
          </p>
        </div>
      </section>
    </Default>
  )
}
export default Project
