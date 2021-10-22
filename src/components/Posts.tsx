import '../stylesheets/Posts.css'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useState } from "react";
import Post from './Post';
import truncate from '../utils/turncate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';

const MY_POSTS = gql`
    query {
      myPosts {
        id
        title
        body
        published
      }
    }
  `

const GET_USERS = gql`
    query {
      users {
        id
        name
      }
    }
    `

interface UserProps {
  name: string;
  id: string
}

interface Users {
  users: UserProps[];
}


interface PostProps {
  title: string;
  id: string;
  body: string;
  published: boolean
  author: {
    name: string
  }
}

interface Posts {
  myPosts: PostProps[];
}

let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci tellus. Vestibulum lacinia magna et diam interdum imperdiet. Vivamus lobortis turpis nec ligula elementum venenatis. Donec sit amet eros urna. Suspendisse ornare rutrum ipsum, ut vehicula purus varius eget. Sed quis neque massa. Aliquam id felis id mauris vehicula consequat. Pellentesque vitae turpis sed magna scelerisque ornare vel eget libero. Nullam non egestas nisi. Maecenas vehicula cursus quam ut placerat. Donec urna augue, cursus sed enim in, aliquam vehicula arcu. Nulla malesuada placerat aliquam. Etiam turpis orci, aliquet et neque sed, lobortis ultricies justo. Nulla facilisi.

Pellentesque mattis augue iaculis turpis sollicitudin sagittis cursus vel purus. In et lectus sapien. Fusce porta metus sed eleifend auctor. Etiam semper ultricies tempor. Duis facilisis mattis ultricies. Sed eget quam commodo, tristique diam sit amet, sollicitudin est. Praesent volutpat eleifend massa in rhoncus. Etiam lobortis, sapien in tincidunt varius, leo eros imperdiet tellus, ac luctus sapien nibh eu nunc. Praesent posuere dolor porta est vehicula, fermentum lacinia metus aliquet. Suspendisse interdum felis libero, sed ornare orci tempus nec. Phasellus in dictum arcu. Donec placerat pharetra lorem, vel viverra diam. Aenean id purus quis orci porta ultrices et eu nisl. Fusce id felis a odio varius malesuada at sit amet elit.

Sed ligula diam, faucibus quis orci a, commodo vestibulum arcu. Ut elementum efficitur tortor eget pellentesque. Mauris finibus ipsum a erat varius egestas. Nullam quis molestie augue. In non facilisis sapien, id eleifend justo. Sed luctus non enim eget mollis. Nullam vulputate augue feugiat sollicitudin lobortis. Cras consequat eleifend ante a tincidunt. Nunc facilisis, nisi ac sodales pretium, magna metus dictum sem, eu tempor nunc tortor sit amet magna. Suspendisse metus dolor, aliquet eget vestibulum vel, accumsan id lorem. Cras rhoncus nulla id mauris suscipit hendrerit. Morbi eu libero sed leo ullamcorper ornare sed at nibh. Quisque et tincidunt libero, id condimentum purus.

Nullam elementum at lacus nec laoreet. Nulla id accumsan sem. Nunc bibendum interdum elit, sit amet feugiat nulla tincidunt quis. Fusce laoreet sem sed enim volutpat, ac sagittis diam laoreet. Duis est felis, hendrerit eu odio vel, egestas scelerisque neque. Vestibulum placerat, dolor eget maximus eleifend, ante sapien consectetur arcu, eget posuere metus urna sed sapien. Vivamus nisi velit, porttitor vitae condimentum quis, tempor semper lacus. Nulla nisi est, feugiat nec metus a, consequat molestie purus. Suspendisse est velit, sagittis in auctor eget, pellentesque nec lorem. Vestibulum sed ligula lorem. Donec iaculis nibh turpis, ut malesuada diam finibus nec.

Suspendisse vestibulum scelerisque nulla sed accumsan. Curabitur ut mattis quam, finibus suscipit ex. Maecenas consectetur sodales facilisis. Curabitur egestas tincidunt augue, sit amet scelerisque eros vehicula eget. Duis dignissim mollis laoreet. Etiam tempus vitae velit et euismod. Donec convallis nulla dolor, sit amet porta erat viverra quis. Morbi tincidunt leo augue, tempus facilisis ex gravida quis.`

let x = [{title: "My title", body: text, id: "1", published: true, author: {name: "John"} }, {title: "SECOND tITE", body: text, id: "2", published: true, author: {name: "Adam"} } ]

const Posts: React.FC= () => {

  //const { loading, error, data  } = useQuery<Users>(GET_USERS);

  const [data1,setData1]=useState<PostProps[]>(x)

  const {loading, error, data } = useQuery<Posts>(MY_POSTS);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (<div className="posts-container">
    <div className="posts-createPost"><FontAwesomeIcon className="posts-plus" icon={faPlus} color="#a99888" />Create Post</div>
    {data1 && data1.map(({title, id, body, author})=> (
      <Post body={truncate(body)} title={title} author={author}  id={id} />
    ))}
    
  </div>)

}

export default Posts;