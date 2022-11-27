import * as React from "react";
import CommunityDropdown from "../../components/Community/CommunityDropdown";
import TextPost from "../../components/CreatePost/TextPost";
import DisplayError from "../../components/Utils/DisplayError";
import PostTabs from "../../components/CreatePost/PostTabs";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_POST } from "../../graphql/posts/mutations";
import Head from "next/head";

export default function CreatePost() {
  const [selectedCommunity, setSelectedCommunity] = React.useState<any>();
  const [postData, setPostData] = React.useState({
    title: "",
    content: "",
    type: "TEXT",
    communityId: null,
  });
  const [error, setError] = React.useState<Record<string, string> | null>(null);
  const [currentTab, setCurrentTab] = React.useState("TEXT");
  const titleTextareaRef = React.createRef<HTMLTextAreaElement>();
  const [titleLength, setTitleLength] = React.useState(0);
  const [submittingPost, setSubmittingPost] = React.useState(false);

  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      setError({
        message: error.graphQLErrors[0].message,
        field: (error.graphQLErrors[0].extensions.field as string) ?? null,
      });
      setSubmittingPost(false);
    },
    onCompleted: (data) => {
      router.push(`/forums/${data.createPost.id}`);
    },
  });

  // increase title textarea height when content increases
  const textAreaChangeHandler = () => {
    const { current } = titleTextareaRef;
    (current as HTMLTextAreaElement).style.height = "auto";
    (current as HTMLTextAreaElement).style.height =
      (titleTextareaRef.current as HTMLTextAreaElement).scrollHeight + "px";
    setTitleLength((current as HTMLTextAreaElement).value.length);
    setPostData({ ...postData, title: (current as HTMLTextAreaElement).value });
  };

  const handlePostSubmit = (e: any) => {
    e.preventDefault();
    setSubmittingPost(true);
    createPost({
      variables: {
        ...postData,
        communityId: selectedCommunity.id,
        type: currentTab,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Submit to Gravity</title>
      </Head>
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
          <PostTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <div className="m-4 mb-0">
            <div className="relative">
              <textarea
                maxLength={300}
                placeholder="Title"
                ref={titleTextareaRef}
                rows={1}
                onChange={textAreaChangeHandler}
                className="overflow-x-hidden break-words py-2 pl-2 pr-16 bg-transparent resize-none box-border w-full border border-theme-gray-line hover:border-theme-nav-icon focus:border-theme-nav-icon focus-visible:outline-none rounded-sm h-10 text-sm"
                required
              ></textarea>
              <span className="text-xxs font-bold absolute bottom-4 right-3 text-theme-gray-action-icon">
                {titleLength}/300
              </span>
              {error && error.field === "title" && (
                <DisplayError error={error.message} />
              )}
            </div>
          </div>

          <TextPost postData={postData} setPostData={setPostData} />

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
              className={`ml-3 px-4 py-1.5 rounded-3xl text-sm bg-theme-blue text-white font-medium hover:brightness-110 ${
                submittingPost ? "grayscale cursor-not-allowed" : ""
              }`}
              disabled={submittingPost}
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
