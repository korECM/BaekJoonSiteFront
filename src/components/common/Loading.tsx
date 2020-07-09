import React from 'react';
import ReactLoading from 'react-loading';

type LoadingType = 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'cubes' | 'spin' | 'spinningBubbles' | 'spokes';

interface LoadingProps {
  type: LoadingType;
  color?: string;
  size?: string;
}

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* margin-top: ${(prop: FullScreenLoadingProps) => prop.margintop || 0}; */
// `;

const Loading = ({ type, color = '#0198e1', size = '8%' }: LoadingProps) => <ReactLoading type={type} color={color} height={size} width={size} />;

// interface FullScreenLoadingProps extends LoadingProps {
//   margintop?: string;
// }

// export function FullScreenLoading({ type, color = '#0198e1', size = '8%', margintop = '0' }: FullScreenLoadingProps) {
//   return (
//     <LoadingWrapper >
//       <ReactLoading type={type} color={color} height={size} width={size} />
//     </LoadingWrapper>
//   );
// }

export default Loading;
