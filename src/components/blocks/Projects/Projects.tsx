import './Projects.scss'

import api from '~/api'

import { useEffect, useState } from 'react'
import { IProject } from '~/types'

import ProjectCard from '~/components/shared/ProjectCard/ProjectCard'

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([])

  const fetchProjects = async () => {
    const data = await api.fetchProjects()
    setProjects(data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section className='projects'>
      <div className='container'>
        <h2 className='projects__title'>
          Projects
        </h2>

        <div className='projects__list'>
          <div className='projects__list-inner'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='projects__list-item'
              >
                <ProjectCard
                  id={project.id}
                  image={project.image}
                  label={project.label}
                  description={project.description}
                  views={project.views}
                  likes={project.likes}
                  created_at={project.created_at}
                  updated_at={project.updated_at}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
