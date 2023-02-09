import '../../assets/styles/blocks/ProjectComments.scss'
import { IProjectsComments } from '~/types'
import { useComponentLoaded } from '~/hooks/useComponentLoaded'

import Comment from '~/components/shared/Comment'
import CommentAdd from '~/components/shared/CommentAdd'

const ProjectComments = (props : {
  comments: IProjectsComments[],
  project_id: number,
  updateComments: (newComment: IProjectsComments) => void
}) => {
  const { comments, project_id, updateComments } = props

  useComponentLoaded(props)

  return (
    <section className='project-comments base-section'>
      <div className='container container_md'>
        <div className='project-comments__title h3'>
          Comments
        </div>
        <div className='project-comments__list'>
          {comments.map(comment => (
            <div
              key={comment.id}
              className='project-comments__list-item'
            >
              <Comment
                name={comment.name}
                comment={comment.comment}
                created={comment.created_at}
              />
            </div>
          ))}
        </div>

        <div className='project-comments__add'>
          <CommentAdd
            project_id={project_id}
            updateComments={updateComments}
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectComments
