import '../stylesheets/Post.css'
import CommentBox from './CommentBox';


interface PostProps {
  title: string;
  body: string;
  author: {
    name: string
  };
  id: string
}



const Post: React.FC<PostProps> = ({title, body, author, id}) => {

  return <div className="post-container" key={id}>
    <div className="post-header">
      <p>{author.name}</p>
      <p>{title}</p>
      <p>2010-20-10</p>
    </div>
    <div className="post-body">
      <p>{body}</p>
      <button>read more</button>
    </div>
    
    {/* <CommentBox /> */}
  </div>

}


export default Post;