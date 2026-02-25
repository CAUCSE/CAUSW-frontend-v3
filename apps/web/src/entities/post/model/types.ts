export interface Post {
  id: number;
  author: {
    name: string;
    profileImage?: string;
    isOfficial?: boolean;
  };
  createdAt: string;
  content: string;
  images?: string[];
  likeCount: number;
  isLiked: boolean;
  vote?: {
    options: {
      value: string;
      label: string;
      count: number;
    }[];
    endTime: string;
  };
}

export interface VoteOption {
  value: string;
  label: string;
  count: number;
}

export interface VoteData {
  options: VoteOption[];
  endTime: string;
}
