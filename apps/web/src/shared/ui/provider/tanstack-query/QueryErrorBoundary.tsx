'use client';

import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  type FallbackProps,
} from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorView } from '../../fallback/error/ErrorView';

interface QueryErrorBoundaryProps extends Omit<
  ErrorBoundaryPropsWithComponent,
  'FallbackComponent'
> {
  FallbackComponent?: React.ComponentType<FallbackProps>;
  fallbackMessage?: string;
}
/**
 * `QueryErrorBoundary`는 `react-error-boundary`와 TanStack Query의 `QueryErrorResetBoundary`를 통합한 컴포넌트입니다.
 *
 * 에러 바운더리가 리셋될 때 쿼리를 자동으로 리셋하여, 에러 후 재시도 시 데이터를 다시 가져올 수 있도록 보장합니다.
 *
 * @example
 * <QueryErrorBoundary FallbackComponent={<div>Error!</div>}>
 *   <ComponentWithQuery />
 * </QueryErrorBoundary>
 * @params
 * fallbackMessage: 에러 화면에서 보여줄 메세지 ( 기본 fallback component 사용시 )
 * @params
 * FallbackComponent: fallback component 커스텀 가능
 */

export const QueryErrorBoundary = ({
  children,
  onReset,
  FallbackComponent,
  fallbackMessage,
  ...props
}: QueryErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={(...args) => {
            reset();
            onReset?.(...args);
          }}
          {...props}
          fallbackRender={(fallbackProps) => {
            if (FallbackComponent) {
              return <FallbackComponent {...fallbackProps} />;
            }
            return (
              <ErrorView {...fallbackProps} errorMessage={fallbackMessage} />
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
