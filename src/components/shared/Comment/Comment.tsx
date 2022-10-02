import './Comment.scss'

const Comment = ({ name, comment, created }: {
  name: string,
  comment: string,
  created: string
}) => {
  return (
    <article className='comment'>
      <div className='comment__info'>
        <div className='comment__name'>
          {name}
        </div>
        <div className='comment__created description'>
          {created}
        </div>
      </div>

      <div className='comment__comment'>
        { comment }
      </div>
    </article>
  )
}
export default Comment
