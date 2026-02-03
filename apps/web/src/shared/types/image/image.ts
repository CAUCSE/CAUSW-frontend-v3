import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

// TODO: API에 따라 수정 필요
export namespace ImageTypes {
  // 이미지 확대 뷰어
  export interface ViewerProps {
    images: string[];
    initialIndex?: number;
    onClose: () => void;
  }

  // 피드용 이미지 슬라이더
  export interface SliderProps {
    images: string[];
    onImageClick?: (index: number) => void;
  }

  // 이미지 업로드 필드
  export interface UploadFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    errorMessage?: string;
    setValue: UseFormSetValue<T>;
    maxFiles?: number;
    resetTrigger?: boolean;
    showMainBadge?: boolean;
    children?: React.ReactNode;
  }
}
