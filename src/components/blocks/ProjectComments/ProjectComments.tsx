import './ProjectComments.scss'
import { IProjectsComments } from '~/types'

import Comment from '~/components/shared/Comment/Comment'
import CommentAdd from '~/components/shared/CommentAdd/CommentAdd'

const ProjectComments = ({ comments, project_id, updateComments } : {
  comments: IProjectsComments[],
  project_id: number,
  updateComments: (newComment: IProjectsComments) => void
}) => {
  return (
    <div className='project-comments'>
      <div className='container'>
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
    </div>
  )
}

export default ProjectComments
