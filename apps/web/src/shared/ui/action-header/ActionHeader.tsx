'use client';

import { type ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronLeft, Primitive, splitVariantProps } from '@causw/cds';

import {
  actionHeader,
  actionHeaderVariantKeys,
  type ActionHeaderVariants,
} from './ActionHeader.styles';

interface BackButtonProps
  extends ComponentProps<'button'>, ActionHeaderVariants {
  children?: React.ReactNode;
}

const BackButton = ({
  children,
  className,
  onClick,
  type,
  ...props
}: BackButtonProps) => {
  const router = useRouter();
  const [variantProps, rest] = splitVariantProps(
    props,
    actionHeaderVariantKeys,
  );
  const { backButton, backButtonIcon, backButtonText } =
    actionHeader(variantProps);

  return (
    <Primitive.button
      type={type ?? 'button'}
      className={backButton({ className })}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
          return;
        }

        router.back();
      }}
      {...rest}
    >
      <ChevronLeft size={18} className={backButtonIcon()} />
      {children && <span className={backButtonText()}>{children}</span>}
    </Primitive.button>
  );
};

interface ActionButtonProps
  extends ComponentProps<'button'>, ActionHeaderVariants {
  children: React.ReactNode;
}

const ActionButton = ({ children, className, ...props }: ActionButtonProps) => {
  const [variantProps, rest] = splitVariantProps(
    props,
    actionHeaderVariantKeys,
  );
  const { actionButton } = actionHeader(variantProps);

  return (
    <Primitive.button className={actionButton({ className })} {...rest}>
      {children}
    </Primitive.button>
  );
};

interface ActionHeaderRootProps
  extends ComponentProps<'header'>, ActionHeaderVariants {
  children: React.ReactNode;
}

const ActionHeaderRoot = (props: ActionHeaderRootProps) => {
  const { children, className, ...rest } = props;

  const [variantProps, actionHeaderProps] = splitVariantProps(
    rest,
    actionHeaderVariantKeys,
  );

  const { root } = actionHeader(variantProps);

  return (
    <header {...actionHeaderProps} className={root({ className })}>
      {children}
    </header>
  );
};

/**
 * ActionHeader는 좌측에 뒤로가기 버튼, 중앙에 타이틀, 우측에 액션 버튼을 고정하는 헤더 컴포넌트
 * isSticky 옵션은 기본 true, 상단 고정을 원하지 않는 경우 false로 설정 필요
 * 각 버튼은 buttonColor 옵션을 통해 색상을 변경할 수 있습니다.
 * @example
 * <ActionHeader>
 *   <ActionHeader.BackButton>뒤로가기</ActionHeader.BackButton>
 *   <ActionHeader.ActionButton>액션</ActionHeader.ActionButton>
 * </ActionHeader>
 */
export const ActionHeader = Object.assign(ActionHeaderRoot, {
  BackButton,
  ActionButton,
});
