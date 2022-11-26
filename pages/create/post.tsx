import CommunityDropdown from "../../components/Community/CommunityDropdown";

export default function CreatePost() {
  const handlePostSubmit = () => {};
  return (
    <div className="pt-6 sm:pt-9 px-2 max-w-3xl mx-auto mb-20">
      <div className="mb-4">
        <h2 className="text-lg mb-3 rounded-md font-medium">Create a post</h2>
        <div className="w-full h-0.5 border border-b-theme-gray-line"></div>
      </div>

      <CommunityDropdown />
    </div>
  );
}
