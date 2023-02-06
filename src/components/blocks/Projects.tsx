import '~/assets/styles/blocks/Projects.scss'

import api from '~/api'

import { IProject } from '~/types'

import NotificationManager from '~/plugins/notification'
import { lazy, useEffect, useRef, useState } from 'react'

import { useStoreState } from '~/store'

import { useModal, names } from '~/providers/ModalProvider'
import { useBreakpoint } from '~/providers/BreakpointProvider'

import gsap from '~/plugins/gsap'
import BaseAnimation from '~/components/base/BaseAnimation'

const ProjectCard = lazy(() => import('~/components/shared/ProjectCard'))
const BaseButton = lazy(() => import('~/components/base/BaseButton'))


const Projects = ({ title } : {
  title: string
}) => {
  const root: any = useRef()

  const { show } = useModal()
  const isLoggedIn = useStoreState(state => state.auth.isLoggedIn)
  const [projects, setProjects] = useState<IProject[]>([])
  const { breakpoints } = useBreakpoint()

  // methods
  const showCreateProjectModal = (data: any) => {
    show({
      name: names.CreateProjectModal,
      props: data
    })
  }

  const fetchProjects = async () => {
    const data = await api.fetchProjects()
    setProjects(data)
  }

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

  // methods

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects && projects.length) {
      const container = root.current?.getElementsByClassName('container')
      const cards = root.current?.getElementsByClassName('projects-card')

      const timeline = gsap.timeline({
        scrollTrigger: {
          markers: false,
          trigger: container,
          start: 'top-=15% center',
          scrub: 1,
          onLeave: (self: any) => {
            self.kill(true, true)
            self.animation.progress(1)
          }
        }
      })

      const cardsLeft = Array.from(cards).filter((card: any, index: any)=>!((index) % 3))
      const cardsRight = Array.from(cards).filter((card: any, index: any)=>!((index + 1) % 3))
      const cardsCenter = Array.from(cards).filter((card: any, index: any)=>!((index + 2) % 3))

      const isDesktop = !breakpoints.sm && !breakpoints.md

      const cartOptions = {
        stagger: 0.5,
        opacity: 0
      }

      if (isDesktop) {
        timeline
          .addLabel('start')
          .from(cardsLeft, {
            ...cartOptions,
            xPercent: -100
            // rotate: 45
          }, 'start')
          .from(cardsRight, {
            ...cartOptions,
            xPercent: 100
            // rotate: -45
          }, 'start')
          .from(cardsCenter, {
            ...cartOptions,
            yPercent: 100,
            rotate: 0
          }, 'start')
          .to(cards, {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            opacity: 1
          })
      } else {
        timeline
          .addLabel('start')
          .from(cards, {
            ...cartOptions,
            stagger: 0,
            yPercent: 50,
            opacity: 0
          }, 'start')
          .to(cards, {
            yPercent: 0,
            opacity: 1
          })
      }
    }
  }, [projects])

  return (
    <section
      ref={root}
      className='projects base-section'
    >
      <div className='container'>
        <BaseAnimation className='base-title'>
          <h2>
            { title }
          </h2>
        </BaseAnimation>

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
                  url={project.url}
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
