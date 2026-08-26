import { FeedListToolbar } from '@/widgets/post-list';

import { useFeedViewMode } from '@/entities/feed';

import { useCommunityMain } from '../../model';

export const CommunityToolbarSection = () => {
  const { data: boards, selectedTab, handleTabChange } = useCommunityMain();
  const { feedViewMode, setFeedViewMode } = useFeedViewMode();

  return (
    <FeedListToolbar
      feedViewMode={feedViewMode}
      onFeedViewModeChange={setFeedViewMode}
      boards={boards}
      selectedTab={selectedTab}
      onSelectedTabChange={handleTabChange}
    />
  );
};
