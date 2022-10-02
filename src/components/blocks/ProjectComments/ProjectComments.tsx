import './ProjectComments.scss'
import Comment from '~/components/shared/Comment/Comment'
import CommentAdd from '~/components/shared/CommentAdd/CommentAdd'

const ProjectComments = () => {
  return (
    <div className='project-comments'>
      <div className='container'>
        <div className='project-comments__title h3'>
          Comments
        </div>
        <div className='project-comments__list'>
          <div className='project-comments__list-item'>
            <Comment
              name='Petya'
              comment='Wow!'
              created='03.03.0.3'
            />
          </div>
          <div className='project-comments__list-item'>
            <Comment
              name='Petya'
              comment='Wow!'
              created='03.03.0.3'
            />
          </div>
        </div>

        <div className='project-comments__add'>
          <CommentAdd />
        </div>
      </div>
    </div>
  )
}

export default ProjectComments
