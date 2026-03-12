/**
 * Next.js App Router page.tsx의 searchParams prop 타입
 *
 * @example 기본 사용 (모든 파라미터 허용)
 * function Page({ searchParams }: { searchParams: NextSearchParams }) {}
 *
 * @example 구체적인 파라미터 키 지정
 * type AlumniSearchParams = NextSearchParams<'keyword' | 'sortType' | 'admissionYearStart'>
 * function Page({ searchParams }: { searchParams: AlumniSearchParams }) {}
 */
export type NextSearchParams<K extends string = string> = Promise<
  Record<K, string | string[] | undefined>
>;
