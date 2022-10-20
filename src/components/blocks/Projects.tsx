import '../../assets/styles/blocks/Projects.scss'

import api from '~/api'

import { RootState } from '~/store/reducers'
import { IProject } from '~/types'

// @ts-ignore
import { NotificationManager } from 'react-notifications'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ProjectCard from '~/components/shared/ProjectCard'
import BaseButton from '~/components/base/BaseButton'
import { useModal, names } from '~/providers/ModalProvider'


const Projects = () => {
  const { show } = useModal()
  const showCreateProjectModal = (data: any) => {
    show({
      name: names.CreateProjectModal,
      props: data
    })
  }

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [projects, setProjects] = useState<IProject[]>([])

  const fetchProjects = async () => {
    const data = await api.fetchProjects()
    setProjects(data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const onAddProject = () => {
    showCreateProjectModal({
      'title': 'Add project',
      'handler': addProject
    })
  }

  const onUpdateProject = (project: IProject) => {
    const index = projects.findIndex(item => item.id === project.id)
    if (index > -1) {
      const newProject = [...projects]
      newProject[index] = project
      setProjects(newProject)
    }
  }

  const onRemoveProject = (id: number) => {
    const newProject = projects.filter(project => project.id !== id)
    setProjects(newProject)
  }

  const addProject = async (fields: any) => {
    try {
      const response = await api.addProject(fields)
      const newProject = [...projects]
      newProject.push(response)
      setProjects(newProject)

      NotificationManager.success('CREATED')
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

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
                  updateProjectHandler={onUpdateProject}
                  removeProjectHandler={onRemoveProject}
                />
              </div>
            ))}
          </div>
        </div>

        {isLoggedIn &&
          <BaseButton
            className='projects__add'
            onClick={onAddProject}
          >
            ADD
          </BaseButton>
        }
      </div>
    </section>
  )
}

export default Projects
