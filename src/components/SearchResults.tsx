import '../stylesheets/Posts.scss'
import {
  useQuery,
  gql
} from "@apollo/client";
import Post from './Post';
import Loading from  '../utils/Loading';
import { useParams } from 'react-router-dom';



  
const POSTS_SEARCH = gql`
  query($query: String ) {
    posts(query: $query) {
      id
      title
      body
      published
      author {
        name
      }
      updatedAt
  }
}
`;

interface PostProps {
  title: string;
  id: string;
  body: string;
  published: boolean
  author: {
    name: string
  };
  updatedAt: string
}

interface Posts {
  posts: PostProps[];
}




const SearchResults: React.FC= () => {

  
  const {fraze} = useParams<{fraze?: string}>();

  const {loading, error, data} = useQuery<Posts>(POSTS_SEARCH, {
    variables: { query: fraze },
  });

 
  if (loading) return <div className="posts-container"><Loading /></div> ;
  if (error) return <div className="posts-container"> <p>No results found(</p></div>;
  return (<div className="posts-container">
    {data && data.posts.map(({title, id, body, author, published, updatedAt})=> (
      <Post updatedAt={updatedAt} published={published} user={false} body={body} title={title} author={author}  id={id} key={id} />
    ))}
  </div>)

}

export default SearchResults;