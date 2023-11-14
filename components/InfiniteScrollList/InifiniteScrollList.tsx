import React, { FC, ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

interface InfiniteScrollListProps extends React.ComponentProps<typeof InfiniteScroll> {
  children: ReactNode;
  initialLoad?: boolean;
}

const InfiniteScrollList: FC<InfiniteScrollListProps> = ({
  children,
  element = 'div',
  useWindow = true,
  loadMore,
  hasMore,
  initialLoad = true,
  getScrollParent,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <InfiniteScroll
      element={element}
      pageStart={1}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={undefined}
      useWindow={useWindow}
      initialLoad={initialLoad}
      getScrollParent={getScrollParent}
      {...props}
    >
      {childrenArray}
    </InfiniteScroll>
  );
};

InfiniteScrollList.displayName = 'InfiniteScrollList';

export default InfiniteScrollList;
