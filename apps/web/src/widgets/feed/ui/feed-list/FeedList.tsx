import { type Board } from '@/entities/feed';

interface FeedListProps {
  boardIds: Board['id'][];
}

export const FeedList = ({ boardIds }: FeedListProps) => {
  console.log({ boardIds });
  return <div>FeedList</div>;
};
