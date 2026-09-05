import { PostListToolbar } from '@/widgets/post-list';

import { usePostViewMode } from '@/entities/post';

import { useCommunityMain } from '../../model';

export const CommunityToolbarSection = () => {
  const { data: boards, selectedTab, handleTabChange } = useCommunityMain();
  const { postViewMode, setPostViewMode } = usePostViewMode();

  return (
    <PostListToolbar
      postViewMode={postViewMode}
      onPostViewModeChange={setPostViewMode}
      boards={boards}
      selectedTab={selectedTab}
      onSelectedTabChange={handleTabChange}
    />
  );
};
