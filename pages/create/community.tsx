import * as React from "react";
import DisplayError from "../../components/Utils/DisplayError";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_SUBREDDIT } from "../../graphql/community/mutations";

/**
 * TODO:
 * Add community Icon
 * redirect to subreddit detail page
 */

export default function CreateCommunity() {
  const [subreddit, setSubreddit] = React.useState({
    name: "",
    description: "",
    icon: null,
  });
  const [error, setError] = React.useState<string | null>(null);
  const [createSubreddit] = useMutation(CREATE_SUBREDDIT, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      router.push(`/community/${data.createCommunity.id}`);
    },
  });
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    createSubreddit({ variables: subreddit });
  };

  return (
    <div className="pt-6 sm:pt-9 px-2 max-w-3xl mx-auto mb-20">
      <div>
        <h2 className="text-2xl mb-2 p-2 rounded-md font-bold">
          Create Community
        </h2>
        <hr className="mb-5" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Add Community icon */}
          <div className="flex flex-col items-start mb-4">
            <label htmlFor="subreddit-name" className="mb-1 required">
              Name
            </label>
            <div className="w-full flex items-center border border-theme-gray rounded-sm">
              <span className="pl-2 text-base">r/</span>
              <input
                onChange={({ target }) =>
                  setSubreddit({ ...subreddit, name: target.value })
                }
                name="name"
                type="text"
                id="subreddit-name"
                minLength={3}
                maxLength={21}
                pattern="^[a-zA-Z0-9_]+$"
                value={subreddit.name}
                className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border-none rounded-sm outline-none focus-within::bg-transparent"
                required
                autoComplete="off"
              />
            </div>

            <span className="text-sm mt-2">{subreddit.name.length} / 21</span>

            <div className="flex items-start mt-2 text-theme-white-500">
              <i className="ri-information-line mr-2 text-xl"></i>
              <span className="text-sm sm:text-md">
                Names cannot have spaces (e.g. "r/bookclub" not "r/book club"),
                must be between 3-21 characters, and underscores ("_") are the
                only special characters allowed.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="subreddit-description" className="mb-1 required">
              Description
            </label>
            <textarea
              onChange={({ target }) =>
                setSubreddit({ ...subreddit, description: target.value })
              }
              value={subreddit.description}
              rows={5}
              required
              minLength={10}
              className="resize-none overflow-auto text-base w-full p-2 bg-transparent border border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
            ></textarea>
          </div>

          <DisplayError error={error} />

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="px-4 sm:px-5 py-1.5 border-2 border-theme-blue rounded-md text-md sm:text-base bg-theme-blue hover:text-theme-white hover:ring-4"
            >
              Create
            </button>
            <button
              type="button"
              className="ml-4 px-4 sm:px-5 py-1.5 border-2 border-theme-red rounded-md text-md sm:text-base bg-theme-red hover:ring-4 ring-red-400/50"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
