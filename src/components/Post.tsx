import CommentBox from './CommentBox'

interface PostProps {
  title: string;
  body: string;
  author: {
    name: string
  }
}


const Post: React.FC<PostProps> = ({title, body, author}) => {
  return <div>
    <p>${title}</p>
    <p>${author.name}</p>
    <p>${body}</p>
    <CommentBox />
  </div>

}


export default Post;