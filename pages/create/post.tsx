import * as React from "react";
import CommunityDropdown from "../../components/Community/CommunityDropdown";
import TextPost from "../../components/CreatePost/TextPost";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_POST } from "../../graphql/posts/mutations";

export default function CreatePost() {
  const [selectedCommunity, setSelectedCommunity] = React.useState<any>();
  const [postData, setPostData] = React.useState({
    title: "",
    content: "",
    type: "TEXT",
    communityId: null,
  });
  const [error, setError] = React.useState<Record<string, string> | null>(null);
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      setError({
        message: error.graphQLErrors[0].message,
        field: (error.graphQLErrors[0].extensions.field as string) ?? null,
      });
    },
    onCompleted: (data) => {
      router.push(`/forums/${data.createPost.id}`);
    },
  });

  const handlePostSubmit = (e: any) => {
    e.preventDefault();
    createPost({
      variables: { ...postData, communityId: selectedCommunity.id },
    });
  };

  return (
    <div className="pt-6 sm:pt-9 px-2 max-w-3xl mx-auto mb-20">
      <div className="mb-4">
        <h2 className="text-lg mb-3 rounded-md font-medium">Create a post</h2>
        <div className="w-full h-0.5 border border-b-theme-gray-line"></div>
      </div>

      <CommunityDropdown
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
      />
      <form className="bg-white rounded-md" onSubmit={handlePostSubmit}>
        {/* Tabs */}
        <TextPost postData={postData} setPostData={setPostData} error={error} />

        <div className="flex items-center justify-end p-4 pt-0">
          <button
            type="button"
            className="px-4 py-1.5 border border-theme-blue text-sm font-medium text-theme-blue hover:bg-theme-blue-50 rounded-3xl"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 px-4 py-1.5 rounded-3xl text-sm bg-theme-blue text-white font-medium hover:brightness-110"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
