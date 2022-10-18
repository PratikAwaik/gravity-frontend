import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/posts/query";

export default function Forum() {
  const { data } = useQuery(GET_ALL_POSTS);
  console.log(data);
  return <>Forum</>;
}
